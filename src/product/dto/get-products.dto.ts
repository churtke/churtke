import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Product } from '../schema/product.schema';
import { PaginationOutput } from 'src/common/dto/pagination.dto';
import { FilterOptions } from 'src/common/filter/filter-options';

@InputType()
export class FilterProductsInput extends FilterOptions {
  @Field(() => String, { nullable: true })
  q?: string;

  @Field(() => String, { nullable: true })
  tag?: string;
}

@ObjectType()
export class FilterProductsOutput extends FilterOptions {
  @Field(() => String, { nullable: true })
  q?: string;

  @Field(() => String, { nullable: true })
  tag?: string;
}

@ObjectType()
export class GetProductsOutput extends CoreOutput {
  @Field(() => [Product], { nullable: true })
  products?: Product[];

  @Field(() => PaginationOutput)
  pagination: PaginationOutput;

  @Field(() => FilterProductsOutput)
  filters: FilterProductsOutput;
}
