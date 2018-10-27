import { GoogleBooksService } from './../google-books.service';
import { BookService } from './../book.service';
import { Book } from './../book';
import { FormsModule } from '@angular/forms';
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
    this.bookService.getLoadedBook(id)
      .subscribe(book => {
        if (book) {
          this.book = book;
          this.inList = true;
        }
      });
    this.gbService.getBook(id)
      .subscribe(gbook => this.book = this.inList ? this.book : gbook);
  }

  add() {
    this.bookService.add(this.book)
      .then(_ => this.inList = true);
  }

  goBack(): void {
    this.location.back();
  }

}
