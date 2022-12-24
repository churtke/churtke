import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/role/schema/role.schema';
import { User } from 'src/user/schema/user.schema';
import { AddRoleInput, AddRoleOutput } from './dto/add-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async addRole(
    input: AddRoleInput,
    currentUser: User,
  ): Promise<AddRoleOutput> {
    const role = await this.roleModel.create({
      _createdBy: currentUser._id,
      ...input,
    });

    return {
      message: 'role added successfully',
      role,
    };
  }
}
