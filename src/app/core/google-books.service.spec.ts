import { Book } from './book';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { GoogleBooksService, searchUrl } from './google-books.service';

describe('GoogleBooksService', () => {
  let service: GoogleBooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GoogleBooksService]
    });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(GoogleBooksService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([GoogleBooksService], (s: GoogleBooksService) => {
    expect(s).toBeTruthy();
  }));

  describe('getBooks', () => {
    it('should call get with correct URL', () => {
      const q = 'testString';
      service.getBooks(q).subscribe();

      const req = httpMock.expectOne(`${searchUrl}?q=${q}&projection=full`);
      req.flush({});
    });

    it('should fetch list of book objects', () => {
      const q = 'testString';
      const sampleResponse = {
        items: [
          { id: '0', volumeInfo: {title: 'TestBook'} },
          { id: '1', volumeInfo: { title: 'TestBook1' } },
          { id: '2', volumeInfo: { title: 'TestBook2' } },
          { id: '3', volumeInfo: { title: 'TestBook3' } },
          { id: '4', volumeInfo: { title: 'TestBook4' } },
          { id: '5', volumeInfo: { title: 'TestBook5' } },
        ]
      };

      service.getBooks(q).subscribe(data => {
        expect(data[0]).toEqual(jasmine.any(Book));
        expect(data.length).toBe(6);
        data.forEach((item, i) => {
          expect(item.id).toBe(sampleResponse.items[i].id);
          expect(item.title).toBe(sampleResponse.items[i].volumeInfo.title);
        });
      });

      const req = httpMock.expectOne(`${searchUrl}?q=${q}&projection=full`);
      req.flush(sampleResponse);
    });
  });

  describe('getBook', () => {
    it('should call get with correct URL', () => {
      const id = 1;
      service.getBook(id).subscribe();

      const req = httpMock.expectOne(`${searchUrl}/${id}`);
      req.flush({});
    });

    it('should return single book object', () => {
      const id = 1;
      const sampleResponse = { id: '1', volumeInfo: { title: 'TestBook' } };

      service.getBook(id).subscribe(data => {
        expect(data).toEqual(jasmine.any(Book));
        expect(data.id).toBe(sampleResponse.id);
        expect(data.title).toBe(sampleResponse.volumeInfo.title);
      });

      const req = httpMock.expectOne(`${searchUrl}/1`);
      req.flush(sampleResponse);
    });
  });
});
