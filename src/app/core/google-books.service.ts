import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, map } from 'rxjs/operators';
import { Book } from './book';

export const searchUrl = 'https://www.googleapis.com/books/v1/volumes';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {

  constructor(private http: HttpClient) { }

  getBooks(q: string): Observable<Book[]> {
    if (!q) { return of([]); }
    return this.http.get<any[]>(`${searchUrl}?q=${q}&projection=full`)
      .pipe(
        // tap(data => console.log(`fetched data`, data['items'])),
        map(data => data['items'].map(item => new Book({id: item.id, ...item.volumeInfo}))),
        // tap(books => console.log(`fetched books`, books)),
        catchError(this.handleError(`getBooks`, []))
      );
  }

  getBook(id): Observable<Book> {
     return this.http.get<any>(`${searchUrl}/${id}`)
      .pipe(
        tap(data => console.log(`fetched data`, data)),
        map(item => new Book({id: item.id, ...item.volumeInfo})),
        catchError(this.handleError<Book>(`getBooks id=${id}` ))
      );
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
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
