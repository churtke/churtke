import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from 'src/role/schema/role.schema';
import { Model } from 'mongoose';

@Injectable()
export class FilterGenerator {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<RoleDocument>,
  ) {}

  async generate(filters): Promise<any> {
    if (filters['sort']) {
      filters['sort'] = filters['sort'].replace('disabled ', '');
    }

    const roleId = filters['_role'];
    if (roleId) {
      filters['role'] = await this.roleModel.findById(roleId);
    }

    return filters;
  }
}
