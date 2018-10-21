import { Injectable } from '@angular/core';
import { Book } from './book';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  BOOKS: Book[] = [];

  constructor() {
    for (let index = 1; index < 5; index++) {
      this.BOOKS.push(new Book(index, 'Book Name Test ' + index));
    }
  }

  getBooks(): Observable<Book[]> {
    return of(this.BOOKS);
  }

  delete(book): Observable<boolean> {
    this.BOOKS = this.BOOKS.filter(b => b.id !== book.id);
    return of(true);
  }
}
