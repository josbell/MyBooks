import { of } from 'rxjs';
import { TestBed, inject } from '@angular/core/testing';

import { BookService } from './book.service';
import { Book } from '../core/book';
import { FirebaseDBService } from './../core/firebase-db.service';

describe('BookService', () => {
  let service: BookService;
  let mockDBService;
  let sampleBooks: Book[] = [];

  beforeEach(() => {
    sampleBooks = [
      new Book({ id: '1', title: 'Book Title 1'}),
      new Book({ id: '2', title: 'Book Title 2' }),
      new Book({ id: '3', title: 'Book Title 3' }),
      new Book({ id: '4', title: 'Book Title 4' }),
      new Book({ id: '5', title: 'Book Title 5' }),
      new Book({ id: '6', title: 'Book Title 6' }),
    ];
    mockDBService = jasmine.createSpyObj(['loadBooks', 'addBook', 'deleteBook']);
    mockDBService.loadBooks.and.returnValue(of(sampleBooks));
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        BookService,
        { provide: FirebaseDBService, useValue: mockDBService }
      ]
    });
    service = TestBed.get(BookService);
  });

  it('should be created', inject([BookService], (s: BookService) => {
    expect(s).toBeTruthy();
  }));

  it('should load books from db on start up', () => {
    service.books.subscribe(books => expect(books.length).toBe(6));
  });

  describe('add()', () => {
    it('should call db addBook method with Book Object', () => {
      const sampleBook: Book = new Book({ id: '7', title: 'Book Title 7' });
      service.add(sampleBook);

      expect(mockDBService.addBook).toHaveBeenCalledWith(sampleBook);
    });
  });

  describe('delete()', () => {
    it('should call db deleteBook method with key', () => {
      const key = '1';
      service.delete(key);

      expect(mockDBService.deleteBook).toHaveBeenCalledWith(key);
    });
  });

  describe('getLoadedBook()', () => {
    it('should fetch book with passed id', () => {
      const id = '1';
      service.getLoadedBook(id).subscribe(book => {
        expect(book.id).toBe('1');
        expect(book.title).toBe('Book Title 1');
      });
    });
  });
});
