export enum Action {
  PROFILE_VIEW = 'profile_view',
  PROFILE_EDIT = 'profile_edit',

  FILE_VIEW = 'file_view',
  FILE_ADD = 'file_add',
}

export const Customer: string[] = [Action.PROFILE_VIEW, Action.PROFILE_EDIT];

export const Manager: string[] = [
  ...Customer,
  Action.FILE_VIEW,
  Action.FILE_ADD,
];

export const Admin: string[] = [...Object.values(Action)];
