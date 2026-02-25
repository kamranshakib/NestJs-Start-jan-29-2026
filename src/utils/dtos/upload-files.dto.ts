import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class UploadedFilesDto {
  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  files: any[];
  @ApiPropertyOptional()
  folder?: string;

  @ApiPropertyOptional()
  height?: number;
  @ApiPropertyOptional()
  width?: number;
}
