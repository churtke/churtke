import { Injectable } from '@nestjs/common';
import { SendCodeInput, SendCodeOutput } from './dto/send-code.dto';
import parsePhoneNumber from 'libphonenumber-js';
import { KavenegarService } from 'src/kavenegar/kavenegar.service';
import { RedisService } from 'src/redis/redis.service';
import * as otpGenerator from 'otp-generator';

@Injectable()
export class AuthService {
  constructor(
    private readonly kavenegarService: KavenegarService,
    private readonly redisService: RedisService,
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
}
