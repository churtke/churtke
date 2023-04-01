import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MessengerService } from 'src/messenger/messenger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtService } from 'src/common/jwt/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, MessengerService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
