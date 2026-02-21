import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Test extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string

}

export const TestSchema = SchemaFactory.createForClass(Test);