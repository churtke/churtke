import { Injectable } from '@nestjs/common';
import { GetCurrentUserOutput } from './dto/get-current-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  async getCurrentUser(currentUser: User): Promise<GetCurrentUserOutput> {
    const user = currentUser as User;

    return {
      message: 'current user was found successfully',
      user,
    };
  }
}
