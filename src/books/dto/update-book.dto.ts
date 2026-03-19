import { PartialType } from '@nestjs/mapped-types';
//  утилитный тип в TypeScript, который делает все свойства типа необязательными
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {}
