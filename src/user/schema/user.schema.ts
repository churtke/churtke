import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { IsBoolean, IsString } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { Types } from 'mongoose';
import { ObjectIdScalar } from 'src/common/scalar/object-id.scalar';
import { Core } from 'src/common/schema/core.schema';
import { Role } from 'src/role/schema/role.schema';

export type UserDocument = User & Document;

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Schema({
  collection: 'users',
  timestamps: true,
})
export class User extends Core {
  @IsObjectId()
  @Field(() => ObjectIdScalar)
  @Prop({ type: Types.ObjectId, ref: Role.name })
  _role: Types.ObjectId;

  @IsString()
  @Field(() => String)
  @Prop({ trim: true, required: true, default: 'New User' })
  fullname: string;

  @IsString()
  @Field(() => String)
  @Prop({ trim: true, required: true, unique: true })
  phone: string;

  @IsBoolean()
  @Field(() => Boolean)
  @Prop({ default: true })
  newUser: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModelFactory: AsyncModelFactory = {
  name: User.name,

  useFactory: async () => {
    const schema = UserSchema;

    return schema;
  },
};
