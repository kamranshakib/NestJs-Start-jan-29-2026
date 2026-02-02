import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dtos';
import { loginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //TODO: POST sign up
  @Post('signup') //auth/signup
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  //TODO: POST login
  @Post('login') //auth/login
  async login(@Body() Credential: loginDto) {
    return this.authService.login(Credential);
  }
  //TODO: POST refresh toekn
  @Post('refresh') //auth/login
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}
