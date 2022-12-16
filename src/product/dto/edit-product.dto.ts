import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Product } from '../schema/product.schema';

@InputType()
export class EditProductInput extends PickType(Product, [
  'title',
  'englishTitle',
  'description',
  'tags',
  'price',
  'inventoryQuantity',
  'thumbnail',
]) {}

@ObjectType()
export class EditProductOutput extends CoreOutput {
  @Field(() => Product, { nullable: true })
  product?: Product;
}
