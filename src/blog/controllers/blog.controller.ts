import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { BlogDto } from '../dtos/blog.dtos';
import { BlogService } from '../services/blog.service';
import { BlogQueryDtos } from '../dtos/blog-query.dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Get()
  findAll(@Query() queryParams: BlogQueryDtos) {
    return this.blogService.findAll(queryParams);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }
  @Post()
  create(@Body() body: BlogDto) {
    return this.blogService.create(body);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() body: BlogDto) {
    return this.blogService.update(id, body);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
