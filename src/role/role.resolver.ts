import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { EditRoleInput, EditRoleOutput } from './dto/edit-role.dto';
import { ObjectIdScalar } from 'src/common/scalar/object-id.scalar';
import { Types } from 'mongoose';
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

  @CheckPermissions([Action.UPDATE, Role.name])
  @Mutation(() => EditRoleOutput)
  async editRole(
    @Args('_id', { type: () => ObjectIdScalar }) _id: Types.ObjectId,
    @Args('input') input: EditRoleInput,
    @CurrentUser() currentUser: User,
  ): Promise<EditRoleOutput> {
    return this.roleService.editRole(_id, input, currentUser);
  }
}
