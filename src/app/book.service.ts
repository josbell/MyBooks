import { Injectable } from '@angular/core';
import { Book } from './book';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { tap, map, catchError, filter } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public books$: Observable<Book[]>;


  constructor(private http: HttpClient,
    private db: AngularFireDatabase) {
      this.books$ = this.db.list<Book>('books').valueChanges();
      this.books$.subscribe(data => console.log(data));
  }

  add(book: Book) {
    return this.db.list('books').push(book);
  }

  remove(book: Book) {

  }

  bookExists(id): Promise<firebase.database.DataSnapshot> {
    console.log(id);
    return this.db.database.ref(`books`)
      .orderByChild('id').equalTo(id).once('value');
  }

  getBook(bookID): AngularFireObject<Book> {
    return this.db.object(`books/${bookID}`);
    // return of(this.books.find(b => b.id === bookID));
    // const url = `${this.booksUrl}/?id=${bookID}`;
    // return this.http.get<Book>(url)
    //   .pipe(
    //     tap(_ => console.log(`fetched book id=${bookID}`)),
    //     catchError(this.handleError<Book>(`getBook id=${bookID}`))
    //   );
  }

  delete(book: Book) {
    // const id = typeof book === 'number' ? book : book.id;
    // const url = `${this.booksUrl}/${id}`;

    // return this.http.delete<Book>(url, httpOptions).pipe(
    //   tap(_ => console.log(`deleted book id=${id}`)),
    //   catchError(this.handleError<Book>('deleteBook'))
    // );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
    };
  }
}
