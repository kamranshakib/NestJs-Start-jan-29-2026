import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum Sort {
  Title = 'title',
  CreatedAt = 'creaedAt',
  UpdatedAt = 'updatedAt',
}
export class GeneralQueryDtos {
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
