import sharp from 'sharp';
import * as mkdirp from 'mkdirp';
import * as fs from 'fs';
import { UploadFileDto } from './dtos/uploadFile.dtos';
import { UploadedFilesDto } from './dtos/upload-files.dto';

export const saveImage = async (
  file: Express.Multer.File,
  body: UploadFileDto,
) => {
  const destination = 'files/' + body.folder;
  mkdirp.sync(destination + '/main');
  mkdirp.sync(destination + '/resized');
  const fileName =
    Date.now() +
    '-' +
    file.originalname.split('.')[0] +
    '.webp'.replace(/[^a-zA-Z0-9.]/g, '-');

  await sharp(file.buffer)
    .webp()
    .toFile(destination + '/main/' + fileName);
  await sharp(file.buffer)
    .webp()
    .resize({ width: body.width || 200, height: body.height || 200 })
    .toFile(destination + '/resized/' + fileName);
  return fileName;
};

// saved images
export const saveImages = async (
  files: Array<Express.Multer.File>,
  body: UploadedFilesDto,
) => {
  const destination = 'files/' + body.folder;
  mkdirp.sync(destination + '/main');
  mkdirp.sync(destination + '/resized');

  const filesName: string[] = [];

  for await (const file of files) {
    const fileName =
      Date.now() +
      '-' +
      file.originalname.split('.')[0] +
      '.webp'.replace(/[^a-zA-Z0-9.]/g, '-');

    await sharp(file.buffer)
      .webp()
      .toFile(destination + '/main/' + fileName);
    await sharp(file.buffer)
      .webp()
      .resize({ width: body.width || 200, height: body.height || 200 })
      .toFile(destination + '/resized/' + fileName);

    filesName.push(fileName);
  }
  return filesName;
};

export const deleteImage = async (fileName: string, folder: string = '') => {
  const imagepath = 'files/' + folder;
  try {
    await fs.promises.unlink(`${imagepath}/main/${fileName}`);
    await fs.promises.unlink(`${imagepath}/resized/${fileName}`);
  } catch (error) {
    console.log(error);
  }
};
