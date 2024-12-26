import {
  Equals,
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';
import { CustomDate } from 'src/core/utils/custom-date';

/** Define un objeto feed proporcionado a través de la API. */
export class CreateFeedDto {
  @IsIn(['el_pais', 'el_mundo'])
  @IsString()
  feed: string;

  @IsString()
  headline: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsUrl()
  imgUrl?: string;

  @IsOptional()
  @IsDateString()
  @Matches(CustomDate.DATE_REGEX)
  date?: string;
}

/** Define un objeto feed creado dentro de la lógica de la aplicación. El campo `origin` tiene el valor 'scraper'. */
export class CreateScrapedFeedDto extends CreateFeedDto {
  @IsString()
  @Equals('scraper')
  readonly origin = 'scraper' as const;
}
