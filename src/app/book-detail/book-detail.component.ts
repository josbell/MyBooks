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
    this.bookService.bookExists(id)
      .then((snapshot) => {
        console.log(snapshot);
        if (snapshot.exists()) {
          console.log(snapshot.val);
          this.inList = true;
        }
      }, (error) => {
        console.log(error);
        this.inList = false;
      });
    // this.getBookFromLocal(id);
    this.getBookInfo(id);
  }

  getBookInfo(id): void {
    this.gbService.getBook(id)
      .subscribe(book => this.book = book);
  }

  add() {
    this.bookService.add(this.book)
      .then(_ => this.inList = true);
  }

  // getBookFromLocal(id) {
  //   this.bookService.getBook(id)
  //     .subscribe(book => this.book = book);
  // }

  goBack(): void {
    this.location.back();
  }

}
