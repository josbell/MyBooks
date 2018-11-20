import { Router } from '@angular/router';
import { BookService } from './../book.service';
import { Book } from './../../core/book';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(
    public bookService: BookService,
    public router: Router) {}

  ngOnInit() {}

  delete(book: Book): void {
    this.bookService.delete(book.key);
  }

  onAdd(): void {
    this.router.navigate(['/dashboard']);
  }

}
