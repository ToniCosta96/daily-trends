import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ValidatorProps } from 'mongoose';
import { CustomDate } from 'src/core/utils/custom-date';

export type FeedDocument = HydratedDocument<Feed>;

@Schema({ collection: 'feeds', timestamps: true })
export class Feed {
  @Prop({ required: true })
  feed: string;

  @Prop({ required: true })
  headline: string;

  @Prop()
  url?: string;

  @Prop({
    type: String,
    required: true,
    enum: ['scraper', 'user'],
    default: 'user',
    select: false,
  })
  origin: 'scraper' | 'user';

  @Prop({
    default: () => new CustomDate().format(),
    validate: {
      validator: function (v: string): boolean {
        return CustomDate.DATE_REGEX.test(v);
      },
      message: (props: ValidatorProps) =>
        `${props.value} is not a valid format! Format must be "YYYY-MM-DD"`,
    },
  })
  date: string;

  createdAt: Date;
  updatedAt: Date;
}

export const FeedSchema = SchemaFactory.createForClass(Feed);
