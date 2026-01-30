import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';

@Module({
  controllers: [],
  providers: [],
  imports: [HelloModule],
})
export class AppModule {}
