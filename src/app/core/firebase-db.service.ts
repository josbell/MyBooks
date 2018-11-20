import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { tap, map, catchError, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDBService {
  private booksRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.booksRef = this.db.list('books');
  }

  loadBooks(): Observable<Book[]> {
    return this.booksRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const book = new Book({ ...c.payload.val() });
          book.key = c.payload.key;
          return book;
        })
      )
    );
  }

  addBook = (book: Book) => this.booksRef.push(book);

  deleteBook = (key: string) => this.booksRef.remove(key);

  bookExists(id): Promise<firebase.database.DataSnapshot> {
    return this.db.database.ref(`books`)
      .orderByChild('id').equalTo(id).once('value');
  }

}
