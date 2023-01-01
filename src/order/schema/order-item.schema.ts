import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { Types } from 'mongoose';
import { ObjectIdScalar } from 'src/common/scalar/object-id.scalar';

@InputType('OrderItemInputType', { isAbstract: true })
@ObjectType()
export class OrderItem {
  @IsObjectId()
  @Field(() => ObjectIdScalar)
  @Prop()
  _product: Types.ObjectId;

  @IsNumber()
  @Field(() => Int)
  @Prop()
  quantity: number;

  @IsNumber()
  @Field(() => Float)
  @Prop()
  price: number;
}
