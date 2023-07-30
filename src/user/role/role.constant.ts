export enum Action {
  PROFILE_VIEW = 'profile_view',
  PROFILE_EDIT = 'profile_edit',

  FILE_VIEW = 'file_view',
  FILE_ADD = 'file_add',

  PRODUCT_VIEW = 'product_view',
  PRODUCT_ADD = 'product_add',
  PRODUCT_EDIT = 'product_edit',
}

export const Customer: string[] = [Action.PROFILE_VIEW, Action.PROFILE_EDIT];

export const Manager: string[] = [
  ...Customer,
  Action.FILE_VIEW,
  Action.FILE_ADD,
  Action.PRODUCT_VIEW,
  Action.PRODUCT_ADD,
  Action.PRODUCT_EDIT,
];

export const Admin: string[] = [...Object.values(Action)];
