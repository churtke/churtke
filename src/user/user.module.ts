import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { FilterGenerator } from 'src/common/filter/filter-generator';

@Module({
  imports: [DatabaseModule],
  providers: [UserResolver, UserService, FilterGenerator],
  exports: [UserService],
})
export class UserModule {}
