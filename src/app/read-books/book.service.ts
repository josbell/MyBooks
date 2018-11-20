import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book } from '../core/book';
import { FirebaseDBService } from './../core/firebase-db.service';
import { asObservable } from '../asObservable';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public books$: Observable<Book[]>;
  private store: BehaviorSubject<Book[]> = new BehaviorSubject([]);

  constructor(private db: FirebaseDBService) {
    db.loadBooks().subscribe(
      books => this.store.next(books)
    );
  }

  get books(): Observable<Book[]> {
    return asObservable(this.store);
  }

  add = (book: Book) => this.db.addBook(book);

  delete = (key: string) => this.db.deleteBook(key);

  getLoadedBook = (id): Observable<Book> => this.books.pipe(map(bks => bks.find(b => b.id === id)));



}
