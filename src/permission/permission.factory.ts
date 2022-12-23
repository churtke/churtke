import { Ability } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action, Subject } from './permission.constants';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionFactory {
  constructor(private readonly userService: UserService) {}

  async defineAbility(user: User) {
    const permissions = await this.userService.getPermissions(user);

    return new Ability<[Action, Subject]>(permissions);
  }
}
