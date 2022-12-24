import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role, RoleDocument } from 'src/role/schema/role.schema';
import { Permission } from 'src/permission/permission.constants';
import { EditUserInput, EditUserOutput } from './dto/edit-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { RemoveUserOutput } from './dto/remove-user.dto';

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

  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId);
  }

  async editUser(
    _id: Types.ObjectId,
    input: EditUserInput,
    currentUser: User,
  ): Promise<EditUserOutput> {
    const user = await this.userModel.findOneAndUpdate(
      { _createdBy: currentUser._id, _id },
      { ...input },
      { new: true },
    );

    if (!user) throw new NotFoundException();

    return {
      message: 'user edited successfully',
      user,
    };
  }

  async removeUser(
    _id: Types.ObjectId,
    currentUser: User,
  ): Promise<RemoveUserOutput> {
    const user = await this.userModel.findOneAndRemove(
      { _createdBy: currentUser._id, _id },
      // TODO: aya be new niaz hastesh ya na baraye remove?
      { new: true },
    );

    if (!user) throw new NotFoundException();

    return {
      message: 'user removed successfully',
      user,
    };
  }
}
