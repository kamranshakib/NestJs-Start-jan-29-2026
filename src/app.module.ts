import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/new-nestApp'),
    BlogModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
