import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_PERMISSIONS } from './permission.decorator';
import { User } from 'src/user/schema/user.schema';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PermissionFactory } from './permission.factory';
import { RequiredPermission } from './permission.constants';
import { TOKEN_HEADER_KEY, TOKEN_PREFIX } from 'src/jwt/jwt.constant';
import { JwtService } from 'src/jwt/jwt.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionFactory: PermissionFactory,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<RequiredPermission[]>(
      CHECK_PERMISSIONS,
      context.getHandler(),
    );

    if (!requiredPermissions) return true;

    const user = await this.getCurrentUser(context);

    if (!user) return false;

    const ability = await this.permissionFactory.defineAbility(user);

    return requiredPermissions.every((permission) => {
      return ability.can(...permission);
    });
  }

  private async getToken(context: ExecutionContext): Promise<any> {
    const gqlContext = GqlExecutionContext.create(context).getContext();

    const token: string = gqlContext.req.headers[TOKEN_HEADER_KEY].replace(
      TOKEN_PREFIX,
      '',
    ).trim();

    return this.jwtService.verify(token.toString());
  }

  private async getCurrentUser(context: ExecutionContext): Promise<User> {
    const token = await this.getToken(context);

    const user = await this.userService.findById(token['userId']);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
