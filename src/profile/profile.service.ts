import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { GetProfileOutput } from './dto/get-profile.dto';

@Injectable()
export class ProfileService {
  async getProfile(user: User): Promise<GetProfileOutput> {
    return {
      message: 'profile was found successfully',
      user,
    };
  }
}
