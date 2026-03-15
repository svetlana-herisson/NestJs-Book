import { Injectable } from '@nestjs/common';
import { IBook } from 'src/interface/book.interface';

@Injectable()
export class BookService {
  private readonly books: IBook[] = [
    {
      id: 1,
      title: '1984',
      description: 'Dystopian novel by George Orwell',
      authors: 'George Orwell',
      favorite: false,
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      description: 'Novel by Harper Lee',
      authors: 'Harper Lee',
      favorite: false,
    },
    {
      id: 3,
      title: 'The Great Gatsby',
      description: 'Novel by F. Scott Fitzgerald',
      authors: 'F. Scott Fitzgerald',
      favorite: true,
    },
  ];

  findAll(): IBook[] {
    return this.books;
  }

  findById(id: number): IBook | undefined {
    return this.books.find((book) => book.id === id);
  }

  create(bookData: Omit<IBook, 'id'>): IBook {
    const newId = Math.max(0, ...this.books.map((b) => b.id)) + 1;
    const newBook: IBook = {
      id: newId,
      ...bookData,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, bookData: Omit<IBook, 'id'>): IBook | undefined {
    const idx = this.books.findIndex((book) => book.id === id);
    if (idx === -1) return undefined;

    const unpdatedBook: IBook = { id, ...bookData };
    this.books[idx] = unpdatedBook;
    return unpdatedBook;
  }

  delete(id: number): boolean {
    const idx = this.books.findIndex((book) => book.id === id);
    if (idx === -1) return false;

    this.books.splice(idx, 1);
    return true;
  }
}
