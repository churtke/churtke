import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PermissionFactory } from './permission.factory';
import { UserService } from '../user/user.service';
import { FilterGenerator } from 'src/common/filter/filter-generator';

@Module({
  imports: [DatabaseModule],
  providers: [PermissionFactory, UserService, FilterGenerator],
  exports: [PermissionFactory],
})
export class PermissionModule {}
