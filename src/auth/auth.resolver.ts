import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/schema/user.schema';
import { AuthService } from './auth.service';
import { SendCodeInput, SendCodeOutput } from './dto/send-code.dto';
import { VerifyCodeInput, VerifyCodeOutput } from './dto/verify-code.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SendCodeOutput)
  async sendCode(@Args('input') input: SendCodeInput): Promise<SendCodeOutput> {
    return this.authService.sendCode(input);
  }

  @Mutation(() => VerifyCodeOutput)
  async verifyCode(
    @Args('input') input: VerifyCodeInput,
  ): Promise<VerifyCodeOutput> {
    return this.authService.verifyCode(input);
  }
}
