import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //TODO: POST sign up
  @Post('signup') //auth/signup
  async signup(@Body() signUpDto: SignUpDto) {
    return signUpDto;
  }

  //TODO: POST login

  //TODO: POST refresh toekn
}
