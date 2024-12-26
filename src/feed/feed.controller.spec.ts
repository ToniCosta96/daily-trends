import { Test, TestingModule } from '@nestjs/testing';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { Feed } from './feed.schema';

const oneFeed: Feed = {
  feed: 'el_pais',
  headline: 'Titular de prueba',
  date: '2024-12-25',
  origin: 'user',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const feeds: Feed[] = [
  oneFeed,
  {
    feed: 'el_mundo',
    headline: 'Titular de prueba 2',
    date: '2024-12-25',
    origin: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const loadAllResult = {
  deletedFeedsCount: 0,
  createdFeedsCount: 0,
};

describe('FeedController', () => {
  let feedController: FeedController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [FeedController],
      providers: [
        {
          provide: FeedService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(oneFeed)),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(oneFeed)),
            findById: jest
              .fn()
              .mockImplementation(() => Promise.resolve(oneFeed)),
            find: jest.fn().mockImplementation(() => Promise.resolve(feeds)),
            delete: jest
              .fn()
              .mockImplementation(() => Promise.resolve(oneFeed)),
            loadAll: jest
              .fn()
              .mockImplementation(() => Promise.resolve(loadAllResult)),
          },
        },
      ],
    }).compile();

    feedController = moduleRef.get<FeedController>(FeedController);
  });

  describe('postFeed', () => {
    it('should return a feed', async () => {
      expect(await feedController.postFeed(oneFeed)).toBe(oneFeed);
    });
  });

  describe('putFeed', () => {
    it('should return a feed', async () => {
      expect(
        await feedController.putFeed('676c4e42909e845911305e31', oneFeed),
      ).toBe(oneFeed);
    });
  });

  describe('getFeed', () => {
    it('should return a feed', async () => {
      expect(await feedController.getFeed('676c4e42909e845911305e31')).toBe(
        oneFeed,
      );
    });
  });

  describe('listFeeds', () => {
    it('should return an array of feeds', async () => {
      expect(await feedController.listFeeds()).toBe(feeds);
    });
  });

  describe('deleteFeed', () => {
    it('should return a message', async () => {
      const id = '676c4e42909e845911305e31';
      expect(await feedController.deleteFeed(id)).toBe(
        `Feed ${id} deleted successfully`,
      );
    });
  });

  describe('loadFeeds', () => {
    it('should return a response', async () => {
      expect(await feedController.loadFeeds()).toStrictEqual({
        savedFeedsCount: 0,
      });
    });
  });
});
