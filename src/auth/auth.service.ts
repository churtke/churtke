import { ForbiddenException, Injectable } from '@nestjs/common';
import { SendCodeInput, SendCodeOutput } from './dto/send-code.dto';
import parsePhoneNumber from 'libphonenumber-js';
import { KavenegarService } from 'src/kavenegar/kavenegar.service';
import { RedisService } from 'src/redis/redis.service';
import * as otpGenerator from 'otp-generator';
import { VerifyCodeInput, VerifyCodeOutput } from './dto/verify-code.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly kavenegarService: KavenegarService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async sendCode(input: SendCodeInput): Promise<SendCodeOutput> {
    const phone = parsePhoneNumber(input.phone, input.region);

    const code = otpGenerator.generate(5, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    await this.redisService.set(phone.number, code, 120);

    await this.kavenegarService.lookup(phone.number, code);

    return {
      message: 'code sent successfully',
    };
  }

  async verifyCode(input: VerifyCodeInput): Promise<VerifyCodeOutput> {
    const phone = parsePhoneNumber(input.phone, input.region).number;

    const code = await this.redisService.get(phone);

    if (code !== input.code)
      throw new ForbiddenException('phone or code incorrect');

    await this.redisService.del(phone);

    const user = await this.userModel.findOneAndUpdate(
      { phone },
      {},
      { upsert: true, new: true },
    );

    const token = await this.jwtService.sign(user._id.toString());

    return {
      message: 'user authenticated successfully',
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      user,
    };
  }
}
