import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelFactory } from 'src/user/schema/user.schema';
import { ProductModelFactory } from '../product/schema/product.schema';

const models = MongooseModule.forFeatureAsync([
  UserModelFactory,
  ProductModelFactory,
]);

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
        connectionFactory: (connection: any) => {
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    models,
  ],
  exports: [models],
})
export class DatabaseModule {}
