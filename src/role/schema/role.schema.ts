import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { ObjectIdScalar } from 'src/common/scalar/object-id.scalar';
import { IsArray, IsString } from 'class-validator';
import { PermissionRole } from './permission-role.schema';
import { Core } from 'src/common/schema/core.schema';

export type RoleDocument = Role & Document;

@InputType('RoleInputType', { isAbstract: true })
@ObjectType()
@Schema({
  collection: 'roles',
  timestamps: true,
})
export class Role extends Core {
  @IsObjectId()
  @Field(() => ObjectIdScalar)
  @Prop()
  _createdBy: Types.ObjectId;

  @IsString()
  @Field(() => String)
  @Prop({ trim: true })
  title: string;

  @IsArray()
  @Field(() => [PermissionRole])
  @Prop()
  permissions: PermissionRole[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);

export const RoleModelFactory: AsyncModelFactory = {
  name: Role.name,

  useFactory: async () => {
    const schema = RoleSchema;

    return schema;
  },
};
