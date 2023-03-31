import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './common/config/validation';
import { AuthModule } from './auth/auth.module';
import { MessengerModule } from './messenger/messenger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    MessengerModule,
    AuthModule,
  ],
})
export class AppModule {}
