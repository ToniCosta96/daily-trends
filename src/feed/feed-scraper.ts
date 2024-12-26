import * as cheerio from 'cheerio';
import { CreateScrapedFeedDto } from './create-feed.dto';

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
  async getAllFeeds(): Promise<CreateScrapedFeedDto[]> {
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

  abstract loadFeeds(): Promise<CreateScrapedFeedDto[]>;
}

export class ElMundoScraper extends ArticleScraper {
  async loadFeeds(): Promise<CreateScrapedFeedDto[]> {
    const $ = await this.loadUrl('https://www.elmundo.es/');

    const articles = $('article').has('header a h2');

    const newFeeds: CreateScrapedFeedDto[] = [];

    articles.each((i, elem) => {
      if (i >= this.feedCount) return false;

      const el = $(elem);
      const aEl = el.find('header a').has('h2');
      const imgEl = el.find('picture img');

      const newFeed = new CreateScrapedFeedDto();
      newFeed.feed = 'el_mundo';
      newFeed.headline = aEl.text();
      newFeed.url = aEl.attr('href');
      newFeed.imgUrl = imgEl.attr('src');

      newFeeds.push(newFeed);

      return true;
    });

    return newFeeds;
  }
}

export class ElPaisScraper extends ArticleScraper {
  async loadFeeds(): Promise<CreateScrapedFeedDto[]> {
    const $ = await this.loadUrl('https://elpais.com/');

    const articles = $('article').has('header h2 a');

    const newFeeds: CreateScrapedFeedDto[] = [];

    articles.each((i, elem) => {
      if (i >= this.feedCount) return false;

      const el = $(elem);
      const aEl = el.find('header h2 a');
      const imgEl = el.find('figure img');

      const newFeed = new CreateScrapedFeedDto();
      newFeed.feed = 'el_pais';
      newFeed.headline = aEl.text();
      newFeed.url = aEl.attr('href');
      newFeed.imgUrl = imgEl.attr('src');

      newFeeds.push(newFeed);

      return true;
    });

    return newFeeds;
  }
}
