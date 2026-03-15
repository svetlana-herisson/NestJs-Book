import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { BookService } from './book.service';
import type { IBook } from 'src/interface/book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BookService) {}
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  fidById(@Param('id') id: string): IBook | undefined {
    const book = this.booksService.findById(+id);
    if (!book) {
      throw new Error(`Книга с id ${id} не найдена`);
    }
    return book;
  }

  @Post()
  create(@Body() bookData: Omit<IBook, 'id'>): IBook {
    return this.booksService.create(bookData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() bookData: Omit<IBook, 'id'>,
  ): IBook | undefined {
    return this.booksService.update(+id, bookData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): { message: string; success: boolean } {
    const success = this.booksService.delete(+id);
    return {
      success,
      message: success ? 'Книга удалена' : 'Книга не найдена',
    };
  }
}
