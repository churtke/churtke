import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UserService } from 'src/user/user.service';
import { DatabaseModule } from 'src/database/database.module';
import { FilterGenerator } from 'src/common/filter/filter-generator';

@Module({
  imports: [DatabaseModule],
  providers: [JwtService, UserService, FilterGenerator],
  exports: [JwtService],
})
export class JwtModule {}
