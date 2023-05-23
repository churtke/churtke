import { Body, Controller, Get, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Permission } from 'src/permission/permission.decorator';
import { Action } from 'src/user/role/role.constant';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { EditProfileInput, EditProfileOutput } from './dto/edit-profile.dto';
import { GetProfileOutput } from './dto/get-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Permission(Action.PROFILE_VIEW)
  @Get()
  async getProfile(@CurrentUser() user: User): Promise<GetProfileOutput> {
    return this.profileService.getProfile(user);
  }

  @Permission(Action.PROFILE_EDIT)
  @Put()
  async editProfile(
    @CurrentUser() user: User,
    @Body() input: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return this.profileService.editProfile(user, input);
  }
}
