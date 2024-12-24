import { DeleteResult, Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feed } from './feed.schema';
import { CreateFeedDto } from './create-feed.dto';
import { FeedScraper } from './feed-scraper';
import { CustomDate } from 'src/core/utils/custom-date';

const SELECT_FEED = 'feed headline url date createdAt updatedAt';

interface LoadAllResult {
  deletedFeedsCount: number;
  createdFeedsCount: number;
}

@Injectable()
export class FeedService {
  private readonly logger = new Logger(FeedService.name);

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

  /** Carga los artículos de portada de diferentes periódicos y los guarda en base de datos. */
  async loadAll(): Promise<LoadAllResult> {
    // Carga los feeds de todos los periódicos.
    const feedScraper = new FeedScraper(5);
    const newFeeds = await feedScraper.getAllFeeds();

    // Elimina los feeds del día que se hayan podido guardar antes para evitar duplicados
    const deleteRes = await this.feedModel
      .deleteMany({ date: new CustomDate().format() })
      .exec();

    // Guarda los feeds en la base de datos
    const res = await this.feedModel.create(newFeeds);

    // Retorna información sobre las operaciones realizadas
    const loadAllResult: LoadAllResult = {
      deletedFeedsCount: deleteRes.deletedCount,
      createdFeedsCount: res.length,
    };
    this.logger.debug(loadAllResult);

    return loadAllResult;
  }
}
