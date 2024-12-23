import { DeleteResult, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feed } from './feed.schema';
import { CreateFeedDto } from './create-feed.dto';

const SELECT_FEED = 'feed headline url createdAt updatedAt';

@Injectable()
export class FeedService {
  constructor(@InjectModel(Feed.name) private feedModel: Model<Feed>) {}

  /** Guarda un nuevo feed. */
  async create(createFeedDto: CreateFeedDto): Promise<Feed> {
    const createdFeed = new this.feedModel(createFeedDto);
    return createdFeed.save();
  }

  /** Actualiza un feed. */
  async update(id: string, createFeedDto: CreateFeedDto): Promise<Feed | null> {
    const feed = await this.feedModel
      .findByIdAndUpdate(id, createFeedDto, { new: true })
      .select(SELECT_FEED)
      .exec();

    if (!feed) return null;

    return feed.save();
  }

  /** Obtiene un feed. */
  async findById(id: string): Promise<Feed | null> {
    return this.feedModel.findById(id).select(SELECT_FEED).exec();
  }

  /** Lista todos los feeds. */
  async findAll(): Promise<Feed[]> {
    return this.feedModel.find().select(SELECT_FEED).exec();
  }

  /** Elimina un feed. */
  async delete(id: string): Promise<DeleteResult> {
    return this.feedModel.deleteOne({ _id: id }).exec();
  }
}
