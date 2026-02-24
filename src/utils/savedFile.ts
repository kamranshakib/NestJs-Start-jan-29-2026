import sharp from 'sharp';
import * as mkdirp from 'mkdirp';
import { UploadFileDto } from './dtos/uploadFile.dtos';

export const saveImage = async (
  file: Express.Multer.File,
  body: UploadFileDto,
) => {
  const destination = 'files/' + body.folder;
  mkdirp.sync(destination + "/main");
  mkdirp.sync(destination + "/resized");
  const fileName =
    Date.now() + '-' + file.originalname.split(".")[0] + ".webp".replace(/[^a-zA-Z0-9.]/g, '-');

  await sharp(file.buffer).webp().toFile(destination + '/main/' + fileName);
  await sharp(file.buffer).webp().resize({ width: body.width || 200, height: body.height || 200 }).toFile(destination + '/resized/' + fileName);
  return fileName;
};
