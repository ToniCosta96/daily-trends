import * as cheerio from 'cheerio';
import { CreateFeedDto } from './create-feed.dto';

/** Obtiene los artículos de portada de varios periódicos. */
export class FeedScraper {
  private scrapers: ArticleScraper[];

  constructor(private feedCount: number) {
    this.scrapers = [
      new ElMundoScraper(this.feedCount),
      new ElPaisScraper(this.feedCount),
    ];
  }

  /** Inicia la consulta de los artículos de todos los periódicos. */
  async getAllFeeds(): Promise<CreateFeedDto[]> {
    const loadedFeeds = await Promise.all(
      this.scrapers.map((sc) => sc.loadFeeds()),
    );

    return loadedFeeds.flat(1);
  }
}

abstract class ArticleScraper {
  constructor(public feedCount: number) {}

  async loadUrl(url: string): Promise<cheerio.CheerioAPI> {
    return cheerio.fromURL(url);
  }

  abstract loadFeeds(): Promise<CreateFeedDto[]>;
}

export class ElMundoScraper extends ArticleScraper {
  async loadFeeds(): Promise<CreateFeedDto[]> {
    const $ = await this.loadUrl('https://www.elmundo.es/');

    const articles = $('article header a');

    const newFeeds: CreateFeedDto[] = [];

    articles.each((i, elem) => {
      if (i >= this.feedCount) return false;

      const newFeed = new CreateFeedDto();
      newFeed.feed = 'el_mundo';
      newFeed.headline = $(elem).text();
      newFeed.url = $(elem).attr('href');

      newFeeds.push(newFeed);

      return true;
    });

    return newFeeds;
  }
}

export class ElPaisScraper extends ArticleScraper {
  async loadFeeds(): Promise<CreateFeedDto[]> {
    const $ = await this.loadUrl('https://elpais.com/');

    const articles = $('article header h2 a');

    const newFeeds: CreateFeedDto[] = [];

    articles.each((i, elem) => {
      if (i >= this.feedCount) return false;

      const newFeed = new CreateFeedDto();
      newFeed.feed = 'el_pais';
      newFeed.headline = $(elem).text();
      newFeed.url = $(elem).attr('href');

      newFeeds.push(newFeed);

      return true;
    });

    return newFeeds;
  }
}