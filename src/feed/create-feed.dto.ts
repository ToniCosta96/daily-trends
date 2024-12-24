import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { CustomDate } from 'src/core/utils/custom-date';

export class CreateFeedDto {
  @IsIn(['el_pais', 'el_mundo'])
  @IsString()
  feed: string;

  @IsString()
  headline: string;

  @IsString()
  url?: string;

  @IsOptional()
  @IsDateString()
  @Matches(CustomDate.DATE_REGEX)
  date?: string;
}
