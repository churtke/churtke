import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { KavenegarService } from 'src/kavenegar/kavenegar.service';
import { RedisService } from 'src/redis/redis.service';
import { JwtService } from 'src/jwt/jwt.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    AuthService,
    AuthResolver,
    KavenegarService,
    RedisService,
    JwtService,
  ],
})
export class AuthModule {}
