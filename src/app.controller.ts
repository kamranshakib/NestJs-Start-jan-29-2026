import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { UploadFileDto } from './utils/dtos/uploadFile.dtos';
import { blob } from 'stream/consumers';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload-file')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileDto,
  ) {
    console.log(file);
    // console.log(body);
  }
}
