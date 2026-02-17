import sharp from 'sharp';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

export const saveImage = async (file: Express.Multer.File) => {
  const destination = 'files/';
  mkdirp.sync(destination);

  await sharp(file.buffer).toFile(destination + file.originalname);
};
