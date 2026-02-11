/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty } from 'class-validator';
export class BlogDto {
  @IsString()
  @IsNotEmpty({ message: 'عنوان نبایدخالی باشد' })
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}
