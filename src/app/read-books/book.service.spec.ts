import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BookService } from './book.service';
import { Book } from '../core/book';

describe('BookService', () => {
  let httpTestingController: HttpTestingController;
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(BookService);
  });

  it('should be created', inject([BookService], (s: BookService) => {
    expect(s).toBeTruthy();
  }));

});
