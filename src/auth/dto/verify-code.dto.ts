import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CountryCode } from 'libphonenumber-js';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from 'src/user/schema/user.schema';

@InputType()
export class VerifyCodeInput {
  @IsString()
  @Field(() => String, { defaultValue: 'IR' })
  region: CountryCode;

  @IsString()
  @Field(() => String)
  phone: string;

  @IsString()
  @Field(() => String)
  code: string;
}

@ObjectType()
export class VerifyCodeOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}
