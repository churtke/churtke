import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { JwtToken } from './jwt.interface';
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from './jwt.constant';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  async sign(userId: string): Promise<JwtToken> {
    const privateKey = this.configService.get<string>('PRIVATE_KEY');

    const accessToken = jwt.sign({ userId }, privateKey, {
      expiresIn: `${ACCESS_TOKEN_EXPIRATION}d`,
    });

    const refreshToken = jwt.sign({ userId }, privateKey, {
      expiresIn: `${REFRESH_TOKEN_EXPIRATION}d`,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verify(token: string): Promise<any> {
    const privateKey = this.configService.get<string>('PRIVATE_KEY');

    return jwt.verify(token, privateKey);
  }
}
