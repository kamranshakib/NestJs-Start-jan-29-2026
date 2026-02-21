import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  file: any;
  @ApiPropertyOptional()
  folder?: string;
}
