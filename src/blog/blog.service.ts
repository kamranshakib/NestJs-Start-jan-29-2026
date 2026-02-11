import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dtos/blog.dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './schemas/Blog.schema';
import { Model } from 'mongoose';
import { BlogQueryDtos } from './dtos/blog-query.dtos';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  async findAll(queryParams: BlogQueryDtos) {
    const page = queryParams.page ?? 1;
    const limit = queryParams.limit ?? 10;

    const blog = await this.blogModel
      .find()
      .skip(page - 1)
      .limit(limit)
      .exec();

    const count = await this.blogModel.countDocuments();
    return { count, blog };
  }

  async findOne(id: string) {
    const blog = await this.blogModel.findOne({ _id: id }).exec();
    if (!blog) {
      throw new NotFoundException();
    } else {
      return blog;
    }
  }

  async create(body: BlogDto) {
    const newBlog = new this.blogModel(body);
    await newBlog.save();
    return newBlog;
  }
  async update(id: string, body: BlogDto) {
    const blog = await this.findOne(id);
    blog.title = body.title;
    blog.content = body.content;
    return await blog.save();
  }

  async delete(id: string) {
    const blog = await this.findOne(id);
    await blog.deleteOne();
  }
}
