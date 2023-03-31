import { Injectable } from '@nestjs/common';
import { SendCodeInput, SendCodeOutput } from './dto/send-code.dto';
import * as otpGenerator from 'otp-generator';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { MessengerService } from '../messenger/messenger.service';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly messengerService: MessengerService,
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
}
