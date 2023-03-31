import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendCodeInput, SendCodeOutput } from './dto/send-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-code')
  async sendCode(@Body() input: SendCodeInput): Promise<SendCodeOutput> {
    return this.authService.sendCode(input);
  }
}
