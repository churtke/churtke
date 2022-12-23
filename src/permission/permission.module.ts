import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PermissionFactory } from './permission.factory';
import { UserService } from '../user/user.service';

@Module({
  imports: [DatabaseModule],
  providers: [PermissionFactory, UserService],
  exports: [PermissionFactory],
})
export class PermissionModule {}
