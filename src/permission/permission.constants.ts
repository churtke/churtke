import { Ability } from '@casl/ability';

export enum Action {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export type Subject = any;

export type AppAbility = Ability<[Action, Subject]>;

export type RequiredPermission = [Action, Subject];

export interface Permission {
  action: Action;
  subject: string;
}
