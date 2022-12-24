import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Role } from '../schema/role.schema';

@InputType()
export class EditRoleInput extends PickType(Role, ['title', 'permissions']) {}

@ObjectType()
export class EditRoleOutput extends CoreOutput {
  @Field(() => Role, { nullable: true })
  role?: Role;
}
