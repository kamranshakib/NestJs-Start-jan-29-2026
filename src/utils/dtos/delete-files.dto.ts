import { IsNotEmpty, IsOptional } from 'class-validator';

export class DeleteImageDto {
  @IsNotEmpty()
  fileName?: string;

  @IsOptional()
  folder?: string;
}
