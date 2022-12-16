import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { validationSchema } from './common/config/validation';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { KavenegarModule } from './kavenegar/kavenegar.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      sortSchema: true,
    }),
    UserModule,
    CommonModule,
    KavenegarModule,
    RedisModule,
  ],
})
export class AppModule {}
