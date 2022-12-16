import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationOutput {
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => Int)
  totalCount: number;
}
