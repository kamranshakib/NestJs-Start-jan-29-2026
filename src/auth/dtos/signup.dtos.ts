/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
export class SignUpDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, {
    message: 'password must contain at least one number',
  })
  password: string;
}
