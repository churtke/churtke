import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MessengerService } from 'src/messenger/messenger.service';

@Module({
  providers: [AuthService, MessengerService],
  controllers: [AuthController],
})
export class AuthModule {}
