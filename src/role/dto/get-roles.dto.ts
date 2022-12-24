import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { PaginationOutput } from 'src/common/dto/pagination.dto';
import { FilterOptions } from 'src/common/filter/filter-options';
import { Role } from 'src/role/schema/role.schema';

@InputType()
export class FilterRolesInput extends FilterOptions {
  @Field(() => String, { nullable: true })
  q?: string;
}

@ObjectType()
export class FilterRolesOutput extends FilterOptions {
  @Field(() => String, { nullable: true })
  q?: string;
}

@ObjectType()
export class GetRolesOutput extends CoreOutput {
  @Field(() => [Role], { nullable: true })
  roles?: Role[];

  @Field(() => PaginationOutput)
  pagination: PaginationOutput;

  @Field(() => FilterRolesOutput)
  filters: FilterRolesOutput;
}
