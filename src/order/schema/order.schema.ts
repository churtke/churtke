import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
  getConnectionToken,
} from '@nestjs/mongoose';
import { IsArray, IsNumber, IsObject } from 'class-validator';
import { Connection, Types } from 'mongoose';
import { Core } from 'src/common/schema/core.schema';
import { OrderItem } from './order-item.schema';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { OrderReceiver } from './order-receiver.schema';
import { Status } from '../model/order-status.enum';
import { ObjectIdScalar } from 'src/common/scalar/object-id.scalar';
import { IsObjectId } from 'class-validator-mongo-object-id';

export type OrderDocument = Order & Document;

@InputType('OrderInputType', { isAbstract: true })
@ObjectType()
@Schema({
  collection: 'orders',
  timestamps: true,
})
export class Order extends Core {
  @IsObjectId()
  @Field(() => ObjectIdScalar)
  @Prop()
  _createdBy: Types.ObjectId;

  @IsNumber()
  @Field(() => Int)
  @Prop()
  orderId: number;

  @IsObject()
  @Field(() => OrderReceiver)
  @Prop()
  receiver: OrderReceiver;

  @IsArray()
  @Field(() => [OrderItem])
  @Prop()
  items: OrderItem[];

  @IsNumber()
  @Field(() => Int)
  @Prop()
  trackId: number;

  @IsNumber()
  @Field(() => Number)
  @Prop({ type: Number, enum: Status, default: 0 })
  status: number;

  @IsNumber()
  @Field(() => Float)
  @Prop()
  ShippingCost: number;

  @IsNumber()
  @Field(() => Float)
  @Prop()
  amount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export const OrderModelFactory: AsyncModelFactory = {
  name: Order.name,

  useFactory: async (connection: Connection) => {
    const schema = OrderSchema;

    const AutoIncrement = AutoIncrementFactory(connection);
    schema.plugin(AutoIncrement, { inc_field: 'orderId' });

    return schema;
  },
  inject: [getConnectionToken()],
};
