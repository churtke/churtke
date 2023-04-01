import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './common/config/validation';
import { AuthModule } from './auth/auth.module';
import { MessengerModule } from './messenger/messenger.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('POSTGRES_URI'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MessengerModule,
    AuthModule,
  ],
})
export class AppModule {}
