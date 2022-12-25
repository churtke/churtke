import { Module } from '@nestjs/common';
import { ZibalService } from './zibal.service';

@Module({
  providers: [ZibalService],
})
export class ZibalModule {}
