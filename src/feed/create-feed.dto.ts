import { IsString } from 'class-validator';

export class CreateFeedDto {
  @IsString()
  feed: string;

  @IsString()
  headline: string;

  @IsString()
  url: string;
}
