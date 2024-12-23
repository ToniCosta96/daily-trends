import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

/** Comprueba que el valor proporcionado sea un ObjectId válido de MongoDB. */
@Injectable()
export class ParseObjectIdPipe
  implements PipeTransform<string, Types.ObjectId>
{
  transform(value: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`"${value}" is not a valid ObjectId`);
    }

    return Types.ObjectId.createFromHexString(value);
  }
}
