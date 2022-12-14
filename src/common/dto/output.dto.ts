import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class CoreOutput {
  @IsString()
  @Field(() => String)
  message: string;
}
