import { Injectable } from '@nestjs/common';
import { GetCurrentUserOutput } from './dto/get-current-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getCurrentUser(currentUser: User): Promise<GetCurrentUserOutput> {
    const user = currentUser as User;

    return {
      message: 'current user was found successfully',
      user,
    };
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId);
  }
}
