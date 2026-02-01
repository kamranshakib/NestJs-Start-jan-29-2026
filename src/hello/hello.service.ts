import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HelloService {
  logger: Logger;
  constructor() {
    this.logger = new Logger('CUSTOM LOGGER');
  }
  getHello(): string {
    this.logger.log('test');
    const name = 'Kamran Shakib';
    return `Hello ${name} This is your first route in NestJS 😎`;
  }
}
