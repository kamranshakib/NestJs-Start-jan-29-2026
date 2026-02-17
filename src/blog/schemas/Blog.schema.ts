import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BlogCatagory } from './blog-catagory.schema';

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop()
  title!: string;
  @Prop()
  content!: string;

  @Prop({
    type: Types.ObjectId,
    ref: BlogCatagory.name,
    required: true,
  })
  catagory: BlogCatagory;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
