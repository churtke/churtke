import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './permission.decorator';
import { User } from 'src/user/user.entity';
import { Role } from 'src/user/role/role.enum';
import { Admin, Customer, Manager } from 'src/user/role/role.constant';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  private async getUser(context: ExecutionContext): Promise<User> {
    const req = context.switchToHttp().getRequest();

    return req['user'] as User;
  }

  private hasAccess(role: Role, action: string): boolean {
    switch (role) {
      case Role.Customer:
        return Customer.includes(action);

      case Role.Manager:
        return Manager.includes(action);

      case Role.Admin:
        return Admin.includes(action);

      default:
        return false;
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<string>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermission) return true;

    const user = await this.getUser(context);

    if (!user) return false;

    return this.hasAccess(user.role, requiredPermission);
  }
}
