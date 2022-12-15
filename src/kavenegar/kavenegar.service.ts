import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Kavenegar from 'kavenegar';

@Injectable()
export class KavenegarService {
  constructor(private readonly configService: ConfigService) {
    this.kavenegar = Kavenegar.KavenegarApi({
      apikey: this.configService.get<string>('KAVENEGAR_API_KEY'),
    });
  }

  private kavenegar: any;

  async lookup(receptor: string, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.kavenegar.VerifyLookup(
        {
          template: this.configService.get<string>('KAVENEGAR_TEMPLATE'),
          receptor,
          token,
        },
        (resp: any, status: any) => {
          if (status !== 200) reject();

          resolve(resp);
        },
      );
    });
  }
}
