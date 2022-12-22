import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Action } from 'src/permission/permission.constants';

registerEnumType(Action, { name: 'PermissionAction' });

@InputType('PermissionRoleInputType', { isAbstract: true })
@ObjectType()
export class PermissionRole {
  @Field(() => Action)
  @Prop({ type: String, enum: Action })
  action: Action;

  @Field(() => String)
  @Prop()
  subject: string;
}
