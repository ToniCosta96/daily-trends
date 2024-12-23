import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { Feed } from './feed.schema';
import { CreateFeedDto } from './create-feed.dto';
import { ParseObjectIdPipe } from 'src/pipes/object-id.pipe';

@Controller('feeds')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  async postFeed(
    @Body(new ValidationPipe()) createFeedDto: CreateFeedDto,
  ): Promise<Feed> {
    return this.feedService.create(createFeedDto);
  }

  @Get()
  async listFeeds(): Promise<Feed[]> {
    return this.feedService.findAll();
  }

  @Get(':id')
  async getFeed(@Param('id', ParseObjectIdPipe) id: string): Promise<Feed> {
    const feed = await this.feedService.findById(id);

    // Comprueba que el documento solicitado exista
    if (!feed) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return feed;
  }

  @Put(':id')
  async putFeed(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body(new ValidationPipe()) createFeedDto: CreateFeedDto,
  ): Promise<Feed> {
    const feed = await this.feedService.update(id, createFeedDto);

    // Comprueba que el documento solicitado exista
    if (!feed) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return feed;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteFeed(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<string> {
    const deleteRes = await this.feedService.delete(id);

    // Comprueba si se ha eliminado el documento
    if (deleteRes.deletedCount === 0)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return `Feed ${id} deleted successfully`;
  }
}
