import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UserService } from 'src/user/user.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [JwtService, UserService],
  exports: [JwtService],
})
export class JwtModule {}
