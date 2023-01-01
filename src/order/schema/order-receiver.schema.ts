import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsString } from 'class-validator';

@InputType('OrderReceiverInputType', { isAbstract: true })
@ObjectType()
export class OrderReceiver {
  @IsString()
  @Field(() => String)
  @Prop()
  fullname: string;

  @IsString()
  @Field(() => String)
  @Prop()
  phone: string;

  @IsString()
  @Field(() => String)
  @Prop()
  country: string;

  @IsString()
  @Field(() => String)
  @Prop()
  state: string;

  @IsString()
  @Field(() => String)
  @Prop()
  city: string;

  @IsString()
  @Field(() => String)
  @Prop()
  address: string;

  @IsString()
  @Field(() => String)
  @Prop()
  zipcode: string;
}
