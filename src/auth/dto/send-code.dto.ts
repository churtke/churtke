import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CountryCode } from 'libphonenumber-js';
import { CoreOutput } from 'src/common/dto/output.dto';

@InputType()
export class SendCodeInput {
  @IsString()
  @Field(() => String, { defaultValue: 'IR' })
  region: CountryCode;

  @IsString()
  @Field(() => String)
  phone: string;
}

@ObjectType()
export class SendCodeOutput extends CoreOutput {}
