import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, map } from 'rxjs/operators';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private searchUrl = 'https://www.googleapis.com/books/v1/volumes';
  private apiKey = 'AIzaSyBPyZo58J6vqAj-eTjPK_SHGLYjVspOueY';
  constructor(private http: HttpClient) { }

  getBooks(q: string) {
    return this.http.get<Book[]>(`${this.searchUrl}?q=${q}&projection=full`)
      .pipe(
        tap(data => console.log(`fetched data`, data['items'])),
        map(data => data['items'].map(item => this.createBook(item))),
        tap(books => console.log(`fetched books`, books)),
        catchError(this.handleError(`getBooks`, []))
      );
  }

  getBook(id): Observable<Book> {
     return this.http.get<Book>(`${this.searchUrl}/${id}`)
      .pipe(
        tap(data => console.log(`fetched data`, data)),
        map(item => this.createBook(item)),
        catchError(this.handleError<Book>(`getBooks id=${id}` ))
      );
  }

  createBook(item): Book {
    return new Book(
      item.id,
      item.volumeInfo.title,
      item.volumeInfo.authors,
      item.volumeInfo.categories,
      item.volumeInfo.description,
      item.volumeInfo.imageLinks);
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
