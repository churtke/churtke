import { Module } from '@nestjs/common';
import { KavenegarService } from './kavenegar.service';

@Module({
  providers: [KavenegarService],
})
export class KavenegarModule {}
