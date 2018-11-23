import { NgSelectModule } from '@ng-select/ng-select';
import { Book } from './../../core/book';
import { GoogleBooksService } from './../../core/google-books.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { BookSearchComponent } from './book-search.component';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let mockRouter, mockGapi;

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockGapi = jasmine.createSpyObj(['getBooks']);
    TestBed.configureTestingModule({
      declarations: [ BookSearchComponent ],
      imports: [NgSelectModule],
      providers: [
        { provide: GoogleBooksService, useValue: mockGapi},
        { provide: Router, useValue: mockRouter}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate when user selects book', () => {
    const book = new Book({ id: '1', title: 'Book 1' });
    component.onChange(book);

    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
