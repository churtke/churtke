import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ObjectIdScalar } from '../scalar/object-id.scalar';
import { Basic } from './basic.schema';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { User } from 'src/user/schema/user.schema';

@InputType('CoreInputType', { isAbstract: true })
@ObjectType()
export class Core extends Basic {
  @IsObjectId()
  @Field(() => ObjectIdScalar)
  @Prop({ type: Types.ObjectId, ref: User.name })
  _createdBy: Date;
}
