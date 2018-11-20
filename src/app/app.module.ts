import 'hammerjs';
import { BookService } from './read-books/book.service';
import { GoogleBooksService } from './core/google-books.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookSearchComponent } from './dashboard/book-search/book-search.component';
import { BookListComponent } from './read-books/book-list/book-list.component';
import { BookDetailComponent } from './read-books/book-detail/book-detail.component';
import { BookComponent } from './read-books/book/book.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './core/app-material/app-material.module';
import { FirebaseDBService } from './core/firebase-db.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BookSearchComponent,
    BookListComponent,
    BookDetailComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppMaterialModule
  ],
  providers: [BookService, GoogleBooksService, AngularFireDatabase, FirebaseDBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
