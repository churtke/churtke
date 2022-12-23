import { SetMetadata } from '@nestjs/common';
import { RequiredPermission } from './permission.constants';

export const CHECK_PERMISSIONS = 'check_permissions';

export const CheckPermissions = (...permissions: RequiredPermission[]) =>
  SetMetadata(CHECK_PERMISSIONS, permissions);
