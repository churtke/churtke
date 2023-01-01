import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelFactory } from 'src/user/schema/user.schema';
import { ProductModelFactory } from 'src/product/schema/product.schema';
import { RoleModelFactory } from 'src/role/schema/role.schema';
import { OrderModelFactory } from 'src/order/schema/order.schema';

const models = MongooseModule.forFeatureAsync([
  UserModelFactory,
  ProductModelFactory,
  RoleModelFactory,
  OrderModelFactory,
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
