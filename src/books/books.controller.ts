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
    @Param('id') id: string, // передает объект всех параметров
    @Body() bookData: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(id, bookData);
  } // инф о теле запроса

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.delete(id);
  }
}
