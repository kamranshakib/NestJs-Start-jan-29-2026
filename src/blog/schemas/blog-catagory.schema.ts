import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class BlogCatagory extends Document {
  @Prop()
  title!: String;
  @Prop()
  content!: String;
}
export const blogCatagorySchema = SchemaFactory.createForClass(BlogCatagory);
