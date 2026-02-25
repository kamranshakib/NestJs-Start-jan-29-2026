import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { UploadFileDto } from './utils/dtos/uploadFile.dtos';
import { saveImage, saveImages } from './utils/savedFile';
import { UploadedFilesDto } from './utils/dtos/upload-files.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello() {
    return 'Hello World';
  }

  @Post('upload-file')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5000000,
          }),
          new FileTypeValidator({
            fileType: /(image\/jpeg|image\/png|image\/jpg|image\/webp)/i,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: UploadFileDto,
  ) {
    return saveImage(file, body);
  }

  @Post('upload-files')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: UploadedFilesDto,
  ) {
    return saveImages(files, body);
  }
}
