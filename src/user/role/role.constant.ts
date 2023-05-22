export enum Action {
  PROFILE_VIEW = 'profile_view',
  PROFILE_EDIT = 'profile_edit',
}

export const Customer: string[] = [Action.PROFILE_VIEW, Action.PROFILE_VIEW];

export const Manager: string[] = [...Customer];

export const Admin: string[] = [...Object.values(Action)];
