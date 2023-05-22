import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from 'src/common/jwt/jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, JwtService],
  exports: [UserService],
})
export class UserModule {}
