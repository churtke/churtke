import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class FilterOptions {
  @Field(() => Number, { defaultValue: 1, nullable: true })
  page: number;

  @Field(() => Number, { defaultValue: 10, nullable: true })
  limit: number;

  @Field(() => String, { defaultValue: '-createdAt', nullable: true })
  sort?: string;
}
