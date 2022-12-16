import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Core } from 'src/common/schema/core.schema';

export type ProductDocument = Product & Document;

@InputType('ProductInputType', { isAbstract: true })
@ObjectType()
@Schema({
  collection: 'products',
  timestamps: true,
})
export class Product extends Core {
  @IsString()
  @Field(() => String)
  @Prop({ trim: true, required: true })
  title: string;

  @IsString()
  @Field(() => String)
  @Prop({ trim: true })
  englishTitle: string;

  @IsString()
  @Field(() => String)
  @Prop({ trim: true })
  description: string;

  @IsArray()
  @Field(() => [String])
  @Prop([{ type: String, trim: true }])
  tags: string[];

  @IsNumber()
  @Field(() => Float)
  @Prop()
  price: number;

  @IsNumber()
  @Field(() => Int)
  @Prop()
  inventoryQuantity: number;

  @IsNumber()
  @Field(() => String)
  @Prop()
  thumbnail: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export const ProductModelFactory: AsyncModelFactory = {
  name: Product.name,

  useFactory: async () => {
    const schema = ProductSchema;

    return schema;
  },
};
