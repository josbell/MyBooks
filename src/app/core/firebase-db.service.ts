import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDBService {
  private booksRef: AngularFireList<any>;
  private userId: string;
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) { this.userId = user.uid; }
      this.booksRef = this.db.list(`books/${this.userId}`);
    });
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
    return this.db.database.ref(`books/${this.userId}`)
      .orderByChild('id').equalTo(id).once('value');
  }

}
