import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsDate } from 'class-validator';
import { Types } from 'mongoose';
import { ObjectIdScalar } from '../scalar/object-id.scalar';

@InputType('BasicInputType', { isAbstract: true })
@ObjectType()
export class Basic {
  @Field(() => ObjectIdScalar)
  _id: Types.ObjectId;

  @IsDate()
  @Field(() => Date)
  @Prop()
  createdAt: Date;
}
