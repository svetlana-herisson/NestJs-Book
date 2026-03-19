import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findById(id);
  }

  @Post()
  async create(@Body() bookData: CreateBookDto): Promise<Book> {
    return this.booksService.create(bookData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() bookData: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(id, bookData);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<{ message: string; success: boolean }> {
    const result = await this.booksService.delete(id);
    return {
      success: result.deleted,
      message: result.deleted ? 'Книга удалена' : 'Книга не найдена',
    };
  }
}
