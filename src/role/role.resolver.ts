import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { EditRoleInput, EditRoleOutput } from './dto/edit-role.dto';
import { ObjectIdScalar } from 'src/common/scalar/object-id.scalar';
import { Types } from 'mongoose';
import { CheckPermissions } from 'src/permission/permission.decorator';
import { Action } from 'src/permission/permission.constants';
import { RemoveRoleOutput } from './dto/remove-role.dto';
import { GetRoleOutput } from './dto/get-role.dto';
import { FilterRolesInput, GetRolesOutput } from './dto/get-roles.dto';
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

  @CheckPermissions([Action.DELETE, Role.name])
  @Mutation(() => RemoveRoleOutput)
  async removeRole(
    @Args('_id', { type: () => ObjectIdScalar }) _id: Types.ObjectId,
    @CurrentUser() currentUser: User,
  ): Promise<RemoveRoleOutput> {
    return this.roleService.removeRole(_id, currentUser);
  }

  @CheckPermissions([Action.READ, Role.name])
  @Query(() => GetRoleOutput)
  async getRole(
    @Args('_id', { type: () => ObjectIdScalar }) _id: Types.ObjectId,
    @CurrentUser() currentUser: User,
  ): Promise<GetRoleOutput> {
    return this.roleService.getRole(_id, currentUser);
  }

  @CheckPermissions([Action.READ, Role.name])
  @Query(() => GetRolesOutput)
  async getRoles(
    @Args('input') input: FilterRolesInput,
    @CurrentUser() currentUser: User,
  ): Promise<GetRolesOutput> {
    return this.roleService.getRoles(input, currentUser);
  }
}
