import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Product } from '../schema/product.schema';

@ObjectType()
export class GetProductOutput extends CoreOutput {
  @Field(() => Product, { nullable: true })
  product?: Product;
}
