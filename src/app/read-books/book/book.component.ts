import { Book } from './../../core/book';
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onDeleteClick(): void {

    this.delete.emit('');
  }

}
