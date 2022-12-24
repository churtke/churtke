import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from '../schema/user.schema';

@InputType()
export class EditUserInput extends PickType(User, ['_role', 'fullname']) {}

@ObjectType()
export class EditUserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
