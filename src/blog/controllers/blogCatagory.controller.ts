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

import { ApiTags } from '@nestjs/swagger';
import { BlogCatagoryDto } from '../dtos/blog-catagory.dtos';
import { BlogCatagoryService } from '../services/blogCatagory.service';
import { BlogCatagoryQueryDto } from '../dtos/blogCatagory.Query.';

@ApiTags('Blog Catagory')
@Controller('blogCatagory')
export class BlogCatagoryController {
  constructor(private readonly blogCatagoryService: BlogCatagoryService) {}
  @Get()
  findAll(@Query() queryParams: BlogCatagoryQueryDto) {
    return this.blogCatagoryService.findAll(queryParams);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogCatagoryService.findOne(id);
  }
  @Post()
  create(@Body() body: BlogCatagoryDto) {
    return this.blogCatagoryService.create(body);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() body: BlogCatagoryDto) {
    return this.blogCatagoryService.update(id, body);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogCatagoryService.delete(id);
  }
}
