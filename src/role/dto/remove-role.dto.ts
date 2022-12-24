import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Role } from '../schema/role.schema';

@ObjectType()
export class RemoveRoleOutput extends CoreOutput {
  @Field(() => Role, { nullable: true })
  role?: Role;
}
