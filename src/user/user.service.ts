import { Injectable, ForbiddenException } from '@nestjs/common';
import { GetCurrentUserOutput } from './dto/get-current-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/role/schema/role.schema';
import { Permission } from 'src/permission/permission.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async getPermissions(user: User): Promise<Permission[]> {
    const role = await this.roleModel.findById(user._role);

    if (!role) throw new ForbiddenException();

    const permissions: Permission[] = role.permissions.map((p) => ({
      action: p.action,
      subject: p.subject,
    }));

    return permissions;
  }

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
