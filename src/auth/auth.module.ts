import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { KavenegarService } from 'src/kavenegar/kavenegar.service';
import { RedisService } from 'src/redis/redis.service';

@Module({
  providers: [AuthService, AuthResolver, KavenegarService, RedisService],
})
export class AuthModule {}
