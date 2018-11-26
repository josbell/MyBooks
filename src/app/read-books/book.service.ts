import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book } from '../core/book';
import { FirebaseDBService } from './../core/firebase-db.service';
import { asObservable } from '../asObservable';
@Injectable({
  providedIn: 'root'
})
export class BookService implements OnDestroy{
  public books$: Observable<Book[]>;
  private store: BehaviorSubject<Book[]> = new BehaviorSubject([]);
  private dbSubscription;

  constructor(private db: FirebaseDBService) {
    this.dbSubscription = db.loadBooks().subscribe(
      books => this.store.next(books.map(book => Object.assign(book, {})))
    );
  }

  ngOnDestroy(): void {
    this.dbSubscription.unsubscribe();
  }

  get books(): Observable<Book[]> {
    return asObservable(this.store);
  }

  add = (book: Book) => this.db.addBook(book);

  delete = (key: string) => this.db.deleteBook(key);

  getLoadedBook = (id): Observable<Book> => this.books.pipe(map(bks => bks.find(b => b.id === id)));



}
