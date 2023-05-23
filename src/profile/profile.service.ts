import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { GetProfileOutput } from './dto/get-profile.dto';
import { EditProfileInput } from './dto/edit-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getProfile(user: User): Promise<GetProfileOutput> {
    return {
      message: 'profile was found successfully',
      user,
    };
  }

  async editProfile(
    user: User,
    input: EditProfileInput,
  ): Promise<GetProfileOutput> {
    user = await this.userRepository.save({
      id: user.id,
      ...input,
    });

    return {
      message: 'profile edited successfully',
      user,
    };
  }
}
