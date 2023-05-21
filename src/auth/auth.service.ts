import { ForbiddenException, Injectable } from '@nestjs/common';
import { SendCodeInput, SendCodeOutput } from './dto/send-code.dto';
import * as otpGenerator from 'otp-generator';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { MessengerService } from '../messenger/messenger.service';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { VerifyCodeInput, VerifyCodeOutput } from './dto/verify-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from 'src/common/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly messengerService: MessengerService,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private redisClient(): Redis {
    return new Redis(this.configService.get<string>('REDIS_URI'));
  }

  private parsePhone(region: CountryCode, phone: string): string {
    return parsePhoneNumber(phone, region).number;
  }

  private generateCode(): string {
    return otpGenerator.generate(5, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
  }

  async sendCode(input: SendCodeInput): Promise<SendCodeOutput> {
    const phone = this.parsePhone(input.region, input.phone);
    const code = this.generateCode();

    await this.redisClient().set(phone, code, 'EX', 120);

    this.messengerService.lookup(phone, code);

    return {
      message: 'code sent successfully',
    };
  }

  async verifyCode(input: VerifyCodeInput): Promise<VerifyCodeOutput> {
    const phone = this.parsePhone(input.region, input.phone);
    const code = await this.redisClient().get(phone);

    if (code !== input.code) {
      throw new ForbiddenException('phone or code incorrect');
    }

    await this.redisClient().del(phone);

    let user = await this.userRepository.findOne({
      where: { phone: phone },
    });

    if (!user) {
      user = new User();
      user.name = 'New User';
      user.phone = phone;
      user.hasAdmin = false;

      await this.userRepository.save(user);
    }

    const token = await this.jwtService.sign(user.id.toString());

    return {
      message: 'user verified successfully',
      token,
      user,
    };
  }
}
