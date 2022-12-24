import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CurrentUser } from './current-user.decorator';
import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { EditUserInput, EditUserOutput } from './dto/edit-user.dto';
import { ObjectIdScalar } from 'src/common/scalar/object-id.scalar';
import { Types } from 'mongoose';
import { CheckPermissions } from 'src/permission/permission.decorator';
import { Action } from 'src/permission/permission.constants';

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
}
