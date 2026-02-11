import { IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class BlogQueryDtos {
  @IsPositive()
  @ApiPropertyOptional({})
  @IsOptional()
  limit?: number;

  @IsPositive()
  @ApiPropertyOptional({})
  @IsOptional()
  page?: number;

  @IsString()
  @ApiPropertyOptional({})
  @IsOptional()
  title?: string;
}
