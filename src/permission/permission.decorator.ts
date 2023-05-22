import { SetMetadata } from '@nestjs/common';
import { Action } from 'src/user/role/role.constant';

export const PERMISSION_KEY = 'permission';

export const Permission = (action: Action) =>
  SetMetadata(PERMISSION_KEY, action);
