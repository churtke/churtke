import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CurrentUser } from './current-user.decorator';
import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { EditUserInput, EditUserOutput } from './dto/edit-user.dto';
import { ObjectIdScalar } from 'src/common/scalar/object-id.scalar';
import { Types } from 'mongoose';
import { CheckPermissions } from 'src/permission/permission.decorator';
import { Action } from 'src/permission/permission.constants';
import { RemoveUserOutput } from './dto/remove-user.dto';
import { GetUserOutput } from './dto/get-user.dto';
import { FilterUsersInput, GetUsersOutput } from './dto/get-users.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @CheckPermissions([Action.UPDATE, User.name])
  @Mutation(() => EditUserOutput)
  async editUser(
    @Args('_id', { type: () => ObjectIdScalar }) _id: Types.ObjectId,
    @Args('input') input: EditUserInput,
    @CurrentUser() currentUser: User,
  ): Promise<EditUserOutput> {
    return this.userService.editUser(_id, input, currentUser);
  }

  @CheckPermissions([Action.DELETE, User.name])
  @Mutation(() => RemoveUserOutput)
  async removeUser(
    @Args('_id', { type: () => ObjectIdScalar }) _id: Types.ObjectId,
    @CurrentUser() currentUser: User,
  ): Promise<RemoveUserOutput> {
    return this.userService.removeUser(_id, currentUser);
  }

  @CheckPermissions([Action.READ, User.name])
  @Query(() => GetUserOutput)
  async getUser(
    @Args('_id', { type: () => ObjectIdScalar }) _id: Types.ObjectId,
    @CurrentUser() currentUser: User,
  ): Promise<GetUserOutput> {
    return this.userService.getUser(_id, currentUser);
  }

  @CheckPermissions([Action.READ, User.name])
  @Query(() => GetUsersOutput)
  async getUsers(
    @Args('input') input: FilterUsersInput,
    @CurrentUser() currentUser: User,
  ): Promise<GetUsersOutput> {
    return this.userService.getUsers(input, currentUser);
  }
}
