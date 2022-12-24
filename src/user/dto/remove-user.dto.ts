import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from '../schema/user.schema';

@ObjectType()
export class RemoveUserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
