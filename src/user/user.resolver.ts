import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from './current-user.decorator';
import { GetCurrentUserOutput } from './dto/get-current-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => GetCurrentUserOutput)
  async getCurrentUser(
    @CurrentUser() currentUser: User,
  ): Promise<GetCurrentUserOutput> {
    return this.userService.getCurrentUser(currentUser);
  }
}
