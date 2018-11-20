import { GoogleBooksService } from './../../core/google-books.service';
import { BookService } from './../book.service';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMaterialModule } from '../../core/app-material/app-material.module';
import { BookDetailComponent } from './book-detail.component';
import { Book } from '../../core/book';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

fdescribe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let mockActivedRoute, mockBookService, mockLocation, mockGapi;
  const bookID = '3';

  beforeEach(async(() => {
    mockActivedRoute = {
      snapshot: { paramMap: { get: () => `${bookID}` } }
    };
    mockBookService = jasmine.createSpyObj(['getLoadedBook', 'updateBook']);
    mockLocation = jasmine.createSpyObj(['back']);
    mockGapi = jasmine.createSpyObj(['getBook']);
    TestBed.configureTestingModule({
      declarations: [ BookDetailComponent ],
      imports: [FormsModule, AppMaterialModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivedRoute },
        { provide: GoogleBooksService, useValue: mockGapi},
        { provide: BookService, useValue: mockBookService },
        { provide: Location, useValue: mockLocation }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
  });

  fdescribe('ngOnInit()', () => {

    it('should start with inList as falsy', () => {
      expect(component.inList).toBeFalsy();
    });

    it('should call book service with correct book id', () => {
      mockBookService.getLoadedBook.and.returnValue(of(new Book({ id: bookID, title: 'Book Service' })));
      mockGapi.getBook.and.returnValue(of(new Book({ id: bookID, title: 'Google Service' })));
      fixture.detectChanges();

      expect(mockBookService.getLoadedBook).toHaveBeenCalledWith(bookID);
    });

    it('should use book from book service if available and not google books service and set inList as true', () => {
      mockBookService.getLoadedBook.and.returnValue(of(new Book({ id: bookID, title: 'Book Service' })));
      mockGapi.getBook.and.returnValue(of(new Book({ id: bookID, title: 'Google Service' })));
      fixture.detectChanges();

      expect(component.book.title).toBe('Book Service');
      expect(component.inList).toBe(true);
    });

    it('should load book from google books service if book service does not fetch record', () => {
      mockBookService.getLoadedBook.and.returnValue(of(null));
      mockGapi.getBook.and.returnValue(of(new Book({ id: bookID, title: 'Google Service' })));
      fixture.detectChanges();

      expect(component.book.title).toBe('Google Service');
      expect(component.inList).toBeFalsy();
    });

    it('should render book image, book name, and book description', () => {
      const book = new Book({ id: bookID, title: 'Book 1', description: 'Book 1 Desc', imageLinks: {small: 'smallImage'} });
      mockBookService.getLoadedBook.and.returnValue(of(book));
      mockGapi.getBook.and.returnValue(of(book));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h2').textContent).toContain('Book 1');
      expect(fixture.nativeElement.querySelector('#description').textContent).toContain('Book 1 Desc');
      expect(fixture.nativeElement.querySelector('img').src).toContain('smallImage');
    });

  });

  describe('goBack()', () => {
    it('should call location back method when go back button is clicked ', () => {
      mockBookService.getLoadedBook.and.returnValue(of({ id: bookID, title: 'Book 1' }));
      mockGapi.getBook.and.returnValue(of(new Book({ id: bookID, title: 'Book 1' })));
      fixture.detectChanges();
      fixture.debugElement.query(By.css('button.backBtn')).triggerEventHandler('click', null);

      expect(mockLocation.back).toHaveBeenCalled();
    });
  });

  describe('add()', () => {

    it('should call bookService.add() with loaded book when addBtn is clicked', () => {
      const book = new Book({ id: bookID, title: 'Book 1' });
      mockBookService.getLoadedBook.and.returnValue(book);
      mockGapi.getBook.and.returnValue(book);
      fixture.detectChanges();
      fixture.debugElement.query(By.css('button.addBtn')).triggerEventHandler('click', null);

      expect(mockBookService.add).toHaveBeenCalledWith(book);
      expect(component.inList).toBe(true);
    });
  });

  it('should rate book when rating button clicked', () => {

  });

  it('should add comments when text is submitted in comments textarea', () => {

  });
});
