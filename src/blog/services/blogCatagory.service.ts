import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogCatagory } from '../schemas/blog-catagory.schema';
import { Model } from 'mongoose';
import { sortFunction } from 'src/utils/sort.utils';
import { BlogCatagoryDto } from '../dtos/blog-catagory.dtos';

import { BlogCatagoryQueryDto } from '../dtos/blogCatagory.Query.';

@Injectable()
export class BlogCatagoryService {
  constructor(
    @InjectModel(BlogCatagory.name)
    private readonly blogCatagoryModel: Model<BlogCatagory>,
  ) {}

  async findAll(queryParams: BlogCatagoryQueryDto) {
    const { title, limit = 5, page = 1, sort } = queryParams;

    const query: any = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    const sortObject = sortFunction(sort);

    const blog = await this.blogCatagoryModel
      .find(query)
      .skip(page - 1)
      .sort(sortObject)
      .limit(limit)
      .exec();

    const count = await this.blogCatagoryModel.countDocuments();
    return { count, blog };
  }

  async findOne(id: string) {
    const blog = await this.blogCatagoryModel.findOne({ _id: id }).exec();
    if (!blog) {
      throw new NotFoundException();
    } else {
      return blog;
    }
  }

  async create(body: BlogCatagoryDto) {
    const newBlog = new this.blogCatagoryModel(body);
    await newBlog.save();
    return newBlog;
  }
  async update(id: string, body: BlogCatagoryDto) {
    await this.blogCatagoryModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }

  async delete(id: string) {
    const blog = await this.findOne(id);
    await blog.deleteOne();
  }
}
