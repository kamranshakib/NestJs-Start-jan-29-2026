import sharp from 'sharp';
import * as mkdirp from 'mkdirp';
import { UploadFileDto } from './dtos/uploadFile.dtos';

export const saveImage = async (
  file: Express.Multer.File,
  body: UploadFileDto,
) => {
  const destination = 'files/' + body.folder;
  mkdirp.sync(destination);
  const fileName =
    Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9.]/g, '-');

  await sharp(file.buffer).toFile(destination + '/' + fileName);
  return fileName;
};
