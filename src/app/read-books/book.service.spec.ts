import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BookService } from './book.service';
import { Book } from '../core/book';

describe('BookService', () => {
  let httpMock: HttpTestingController;
  let service: BookService;
  let mockDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(BookService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([BookService], (s: BookService) => {
    expect(s).toBeTruthy();
  }));



});
