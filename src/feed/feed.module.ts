import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { Feed, FeedSchema } from './feed.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Feed.name, schema: FeedSchema }]),
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
