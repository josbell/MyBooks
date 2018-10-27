import { Injectable } from '@angular/core';
import { Book } from './book';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { tap, map, catchError, filter } from 'rxjs/operators';
import { asObservable } from './asObservable';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public books$: Observable<Book[]>;
  public booksRef: AngularFireList<any>;
  private store: BehaviorSubject<Book[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient,
    private db: AngularFireDatabase) {
    this.booksRef = this.db.list('books');
    this.booksRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const book = new Book({ ...c.payload.val() });
          book.key = c.payload.key;
          return book;
        })
      )
    ).subscribe(books => this.store.next(books));
  }

  get books(): Observable<Book[]> {
    return asObservable(this.store);
  }

  getLoadedBook(id): Observable<Book> {
    return this.books.pipe(
      map(bks => bks.find(b => b.id === id))
    );
  }

  add(book: Book) {
    return this.booksRef.push(book);
  }

  delete(key: string) {
    this.booksRef.remove(key);
  }

  bookExists(id): Promise<firebase.database.DataSnapshot> {
    return this.db.database.ref(`books`)
      .orderByChild('id').equalTo(id).once('value');
  }

}
