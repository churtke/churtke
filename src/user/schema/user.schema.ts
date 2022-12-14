import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { IsBoolean, IsString } from 'class-validator';
import { Basic } from 'src/common/schema/basic.schema';

export type UserDocument = User & Document;

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Schema({
  collection: 'users',
  timestamps: true,
})
export class User extends Basic {
  @IsString()
  @Field(() => String)
  @Prop({ trim: true, required: true })
  fullname: string;

  @IsString()
  @Field(() => String)
  @Prop({ trim: true, required: true })
  phone: string;

  @IsBoolean()
  @Field(() => Boolean)
  @Prop({ default: false })
  hasAdmin: boolean;

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
