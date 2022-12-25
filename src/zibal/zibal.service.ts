import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Zibal from 'zibal';

@Injectable()
export class ZibalService {
  constructor(private readonly configService: ConfigService) {
    this.zibal = new Zibal({
      merchant: this.configService.get<string>('ZIBAL_MERCHANT'),
      callbackUrl: this.configService.get<string>('ZIBAL_CALLBACK_URL'),
      logLevel: 0,
    });
  }

  private zibal: Zibal;

  async request(amount: number, orderId: string): Promise<any> {
    return this.zibal.request({
      amount,
      orderId,
    });
  }

  async verify(trackId: number): Promise<any> {
    return this.zibal.verify(trackId);
  }
}
