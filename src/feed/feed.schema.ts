import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FeedDocument = HydratedDocument<Feed>;

@Schema({ collection: 'feeds', timestamps: true })
export class Feed {
  @Prop({ required: true })
  feed: string;

  @Prop({ required: true })
  headline: string;

  @Prop({ required: true })
  url: string;

  createdAt: Date;
  updatedAt: Date;
}

export const FeedSchema = SchemaFactory.createForClass(Feed);
