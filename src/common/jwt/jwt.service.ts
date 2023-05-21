import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtModuleOptions } from './jwt.interface';
import { JWT_CONFIG_OPTIONS } from './jwt.constant';

@Injectable()
export class JwtService {
  constructor(
    @Inject(JWT_CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  sign(userId: string): string {
    return jwt.sign({ userId }, this.options.privateKey, {
      expiresIn: this.options.expiration,
    });
  }

  verify(token: string): any {
    return jwt.verify(token, this.options.privateKey);
  }
}
