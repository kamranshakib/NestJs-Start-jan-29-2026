import { Module } from '@nestjs/common';
import { BlogController } from './controllers/blog.controller';
import { BlogService } from './services/blog.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schemas/Blog.schema';
import { BlogCatagoryController } from './controllers/blogCatagory.controller';
import { BlogCatagoryService } from './services/blogCatagory.service';
import {
  BlogCatagory,
  blogCatagorySchema,
} from './schemas/blog-catagory.schema';
import { Test, TestSchema } from './schemas/test.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Blog.name,
        schema: BlogSchema,
      },
      {
        name: BlogCatagory.name,
        schema: blogCatagorySchema,
      },
      {
        name: Test.name,
        schema: TestSchema
      },
    ]),
  ],
  controllers: [BlogController, BlogCatagoryController],
  providers: [BlogService, BlogCatagoryService],
})
export class BlogModule { }
