import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { PaginationOutput } from 'src/common/dto/pagination.dto';
import { FilterOptions } from 'src/common/filter/filter-options';
import { User } from '../schema/user.schema';
import { ObjectIdScalar } from 'src/common/scalar/object-id.scalar';
import { Types } from 'mongoose';
import { Role } from 'src/role/schema/role.schema';

@InputType()
export class FilterUsersInput extends FilterOptions {
  @Field(() => String, { nullable: true })
  q?: string;

  @Field(() => ObjectIdScalar, { nullable: true })
  _role?: Types.ObjectId;
}

@ObjectType()
export class FilterUsersOutput extends FilterOptions {
  @Field(() => String, { nullable: true })
  q?: string;

  @Field(() => ObjectIdScalar, { nullable: true })
  _role?: Types.ObjectId;

  @Field(() => Role, { nullable: true })
  role?: Role;
}

@ObjectType()
export class GetUsersOutput extends CoreOutput {
  @Field(() => [User], { nullable: true })
  users?: User[];

  @Field(() => PaginationOutput)
  pagination: PaginationOutput;

  @Field(() => FilterUsersOutput)
  filters: FilterUsersOutput;
}
