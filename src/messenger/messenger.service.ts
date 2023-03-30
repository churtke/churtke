import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Kavenegar from 'kavenegar';

@Injectable()
export class MessengerService {
  constructor(private configService: ConfigService) {
    this.client = Kavenegar.KavenegarApi({
      apikey: this.configService.get<string>('MESSENGER_API_KEY'),
    });
    this.template = this.configService.get<string>('MESSENGER_TEMPLATE');
  }

  private client: Kavenegar;
  private template: string;

  async lookup(receptor: string, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.VerifyLookup(
        {
          template: this.template,
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
