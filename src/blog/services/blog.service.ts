import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from '../dtos/blog.dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from '../schemas/Blog.schema';
import { Model } from 'mongoose';
import { BlogQueryDtos } from '../dtos/blog-query.dtos';
import { sortFunction } from 'src/utils/sort.utils';
import { deleteImage } from 'src/utils/savedFile';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  async findAll(queryParams: BlogQueryDtos) {
    const { title, limit = 5, page = 1, sort } = queryParams;

    const query: any = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' }; // seek from database wihtout word prefect
    }

    const sortObject = sortFunction(sort);
    const blog = await this.blogModel
      .find(query)
      .skip(page - 1)
      .sort(sortObject)
      .limit(limit)
      .exec();

    const count = await this.blogModel.countDocuments();
    return { count, blog };
  }

  async findOne(id: string) {
    const blog = await this.blogModel
      .findOne({ _id: id })
      .populate('catagory')
      .exec();
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

    if (blog.image !== body.image) {
      await deleteImage(blog.image, 'blog');
    }
    await this.blogModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }

  async delete(id: string) {
    const blog = await this.findOne(id);

    await deleteImage(blog.image, 'blog');

    await blog.deleteOne();
  }
}
