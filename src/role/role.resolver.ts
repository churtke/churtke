import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CheckPermissions } from 'src/permission/permission.decorator';
import { Action } from 'src/permission/permission.constants';
import { Role } from './schema/role.schema';
import { RoleService } from './role.service';
import { User } from 'src/user/schema/user.schema';
import { CurrentUser } from 'src/user/current-user.decorator';
import { AddRoleInput, AddRoleOutput } from './dto/add-role.dto';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @CheckPermissions([Action.CREATE, Role.name])
  @Mutation(() => AddRoleOutput)
  async addRole(
    @Args('input') input: AddRoleInput,
    @CurrentUser() currentUser: User,
  ): Promise<AddRoleOutput> {
    return this.roleService.addRole(input, currentUser);
  }
}
