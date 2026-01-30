import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  getHello(): string {
    const name = 'Kamran Shakib';
    return `Hello ${name} This is your first route in NestJS 😎`;
  }
}
