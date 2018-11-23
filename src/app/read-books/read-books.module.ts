import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookComponent } from './book/book.component';
import { BookService } from './book.service';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [BookListComponent, BookDetailComponent, BookComponent],
    exports: [BookListComponent, BookDetailComponent, BookComponent],
    providers: [BookService]
})
export class ReadBooksModule { }
