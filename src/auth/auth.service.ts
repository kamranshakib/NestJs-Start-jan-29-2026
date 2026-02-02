import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dtos/signup.dtos';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  async signUp(signUpDto: SignUpDto) {
    const { email, password, name } = signUpDto;

    //TODO: Cheak if email is in use
    const emailInUse = await this.UserModel.findOne({ email });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }

    //TODO: Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    //TODO: Create user document and save in mongod b
    await this.UserModel.create({
      name,
      email,
      password: hashPassword,
    });
  }
}
