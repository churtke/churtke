import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { FilterGenerator } from '../common/filter/filter-generator';

@Module({
  imports: [DatabaseModule],
  providers: [RoleResolver, RoleService, FilterGenerator],
})
export class RoleModule {}
