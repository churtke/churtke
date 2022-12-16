import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { JwtToken } from './jwt.interface';
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from './jwt.constant';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {
    this.privateKey = this.configService.get<string>('PRIVATE_KEY');
  }

  privateKey: string;

  async sign(userId: string): Promise<JwtToken> {
    return {
      accessToken: jwt.sign({ userId }, this.privateKey, {
        expiresIn: `${ACCESS_TOKEN_EXPIRATION}d`,
      }),
      refreshToken: jwt.sign({ userId }, this.privateKey, {
        expiresIn: `${REFRESH_TOKEN_EXPIRATION}d`,
      }),
    };
  }

  async verify(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.privateKey);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
