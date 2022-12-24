import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role, RoleDocument } from 'src/role/schema/role.schema';
import { EditRoleInput, EditRoleOutput } from './dto/edit-role.dto';
import { RemoveRoleOutput } from './dto/remove-role.dto';
import { GetRoleOutput } from './dto/get-role.dto';
import { FilterRolesInput, GetRolesOutput } from './dto/get-roles.dto';
import { FilterGenerator } from 'src/common/filter/filter-generator';
import { User } from 'src/user/schema/user.schema';
import { RoleFilter } from './model/role.filter';
import { AddRoleInput, AddRoleOutput } from './dto/add-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
    private readonly filterGenerator: FilterGenerator,
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

  async editRole(
    _id: Types.ObjectId,
    input: EditRoleInput,
    currentUser: User,
  ): Promise<EditRoleOutput> {
    const role = await this.roleModel.findOneAndUpdate(
      { _createdBy: currentUser._id, _id },
      { ...input },
      { new: true },
    );

    if (!role) throw new NotFoundException();

    return {
      message: 'role edited successfully',
      role,
    };
  }

  async removeRole(
    _id: Types.ObjectId,
    currentUser: User,
  ): Promise<RemoveRoleOutput> {
    const role = await this.roleModel.findOneAndRemove(
      { _createdBy: currentUser._id, _id },
      { new: true },
    );

    if (!role) throw new NotFoundException();

    return {
      message: 'role removed successfully',
      role,
    };
  }

  async getRole(
    _id: Types.ObjectId,
    currentUser: User,
  ): Promise<GetRoleOutput> {
    const role = await this.roleModel.findOne({
      _createdBy: currentUser._id,
      _id,
    });

    if (!role) throw new NotFoundException();

    return {
      message: 'role was found successfully',
      role,
    };
  }

  async getRoles(
    input: FilterRolesInput,
    currentUser: User,
  ): Promise<GetRolesOutput> {
    const filters = new RoleFilter(input, { _createdBy: currentUser._id });

    const roles = await this.roleModel.find(
      filters.getFilterQuery(),
      {},
      filters.getQueryOptions(),
    );

    const totalCount = await this.roleModel.count(filters.getFilterQuery());

    return {
      message: 'roles was found successfully',
      roles,
      pagination: { page: input.page, totalCount },
      filters: await this.filterGenerator.generate(input),
    };
  }
}
