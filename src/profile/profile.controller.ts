import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Permission } from 'src/permission/permission.decorator';
import { Action } from 'src/user/role/role.constant';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Permission(Action.PROFILE_VIEW)
  @Get()
  async getProfile(@CurrentUser() user: User) {
    return this.profileService.getProfile(user);
  }
}
