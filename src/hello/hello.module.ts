import { Module } from '@nestjs/common';
import { HelloService } from './hello.service';
import { HelloController } from './hello.controller';

@Module({
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
