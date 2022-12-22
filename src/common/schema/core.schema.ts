import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ObjectIdScalar } from '../scalar/object-id.scalar';
import { IsDate } from 'class-validator';

@InputType('CoreInputType', { isAbstract: true })
@ObjectType()
export class Core {
  @Field(() => ObjectIdScalar)
  _id: Types.ObjectId;

  @IsDate()
  @Field(() => Date)
  @Prop()
  createdAt: Date;
}
