import {
  Body,
  Controller,
  Delete,
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
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadFileDto } from './utils/dtos/uploadFile.dtos';
import { deleteImage, saveImage, saveImages } from './utils/savedFile';
import { UploadedFilesDto } from './utils/dtos/upload-files.dto';
import { DeleteImageDto } from './utils/dtos/delete-files.dto';

@ApiTags('Shared')
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
  // files interceptor  = for a lot of images or files
  // file interceptor use for one image or one file
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: UploadedFilesDto,
  ) {
    return saveImages(files, body);
  }

  // @Delete()
  // deleteFile(@Body() body: DeleteImageDto) {
  //   return deleteImage(body.fileName, body.folder);
  // }
}
