import { GoogleBooksService } from './../../core/google-books.service';
import { BookService } from './../book.service';
import { Book } from './../../core/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  inList: boolean;

  constructor(
    private route: ActivatedRoute,
    private gbService: GoogleBooksService,
    private bookService: BookService,
    private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadFromList(id);
    this.handleBooksNotInList(id);
  }

  loadFromList(id) {
    this.bookService.getLoadedBook(id)
      .subscribe((book: Book) => {
        if (book) {
          this.book = book.copy();
          this.inList = true;
        }
      });
  }

  handleBooksNotInList(id) {
    this.gbService.getBook(id)
      .subscribe((gbook: Book) => this.book = this.inList ? this.book : gbook.copy());
  }

  add() {
    this.inList = true;
    this.bookService.add(this.book)
      .then(
        fulfilled => this.inList = true,
        rejected => this.inList = false
      );
  }

  goBack(): void {
    this.location.back();
  }

}
