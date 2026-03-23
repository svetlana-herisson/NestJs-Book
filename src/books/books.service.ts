import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Книга с ID ${id} не найдена`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      const createdBook = new this.bookModel(createBookDto);
      return await createdBook.save();
    } catch (error) {
      if (error instanceof Error && 'message' in error) {
        throw new BadRequestException(
          `Ошибка при создании книги: ${error.message}`,
        );
      }
      throw new BadRequestException(
        'Ошибка при создании книги: неизвестная ошибка',
      );
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();

    if (!updatedBook) {
      throw new NotFoundException(`Книга с ID ${id} не найдена`);
    }

    return updatedBook;
  }

  async delete(id: string): Promise<Book> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deletedBook) {
      throw new NotFoundException('Книга не найдена');
    }
    return deletedBook;
  }
}
