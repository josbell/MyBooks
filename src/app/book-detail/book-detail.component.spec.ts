import { BookService } from './../book.service';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailComponent } from './book-detail.component';
import { Book } from '../book';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let mockActivedRoute, mockBookService, mockLocation;
  const bookID = '3';

  beforeEach(async(() => {
    mockActivedRoute = {
      snapshot: { paramMap: { get: () => `${bookID}` } }
    };
    mockBookService = jasmine.createSpyObj(['getBook', 'updateBook']);
    mockBookService.getBook.and.returnValue(of(new Book(bookID, 'Book 1')));
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      declarations: [ BookDetailComponent ],
      imports: [FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivedRoute },
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get call book service with correct book id', () => {
    fixture.detectChanges();

    expect(mockBookService.getBook).toHaveBeenCalledWith(bookID);
  });

  it('should render book image, book name, and book description', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('Book 1');
  });

  it('should call location back method when go back button is clicked ', () => {
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button.backBtn')).triggerEventHandler('click', null);

    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should rate book when rating button clicked', () => {

  });

  it('should add comments when text is submitted in comments textarea', () => {

  });
});
