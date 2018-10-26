import { BookService } from './../book.service';
import { Book } from './../book';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(public bookService: BookService) {

  }

  ngOnInit() {
    // this.getBooks();
  }

  // getBooks(): void {
  //   this.bookService.getBooks()
  //     .subscribe(books => this.books = books);
  // }

  delete(book: Book): void {
    this.books = this.books.filter(b => b.id !== book.id);
    this.bookService.delete(book).subscribe();
  }

}
