import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum Sort {
  Title = 'title',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}
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

  @ApiPropertyOptional({})
  @IsOptional()
  @IsEnum(Sort)
  sort?: Sort;
}
