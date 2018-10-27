import { GoogleBooksService } from './../google-books.service';
import { Book } from './../book';
import { Component, OnInit } from '@angular/core';
import { Subject, concat, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  books$: Observable<Book[]>;
  booksInput$ = new Subject<string>();
  loading = false;
  constructor(private gbService: GoogleBooksService,
    private router: Router) {}

  ngOnInit() {
    this.loadBooks();
  }

  onChange(book: Book) {
    this.router.navigate(['/detail', book.id]);
  }

  private loadBooks(): void {
    this.books$ = concat(
      of([]), // default items
      this.booksInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.loading = true),
        switchMap(term => this.gbService.getBooks(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.loading = false)
        ))
      )
    );
  }

}
