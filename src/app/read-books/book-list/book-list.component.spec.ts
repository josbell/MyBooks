import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { AppMaterialModule } from '../../shared/app-material.module';
import { Book } from '../../core/book';
import { BookService } from '../book.service';


export class MockService {
    get books() {
        return [];
    }
    delete(book: Book) {}
}

@Component({
    selector: 'app-book',
    template: '<div></div>'
})
export class FakeBookComponent {
    @Input() book: Book;
}

describe('BookListComponent', () => {
    let component: BookListComponent;
    let fixture: ComponentFixture<BookListComponent>;
    let service;
    let booksSpy;
    let deleteSpy;
    let BOOKS;
    let mockRouter;

    beforeEach(() => {
        BOOKS = [];
        for (let index = 1; index < 5; index++) {
            BOOKS.push(new Book({ key: index, id: index, title: 'Book Name Test ' + index }));
        }
        mockRouter = jasmine.createSpyObj(['navigate']);
        service =  new MockService();
        TestBed.configureTestingModule({
            imports: [AppMaterialModule],
            declarations: [
                BookListComponent,
                FakeBookComponent
            ],
            providers: [
                { provide: BookService, useValue: service},
                { provide: Router, useValue: mockRouter}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BookListComponent);
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(BookService);
        booksSpy = spyOnProperty(service, 'books', 'get').and.returnValue(of(BOOKS));
        deleteSpy = spyOn(service, 'delete').and.returnValue(true);
    });

    afterEach(() => {
        service = null;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch books from service on init', () => {
        fixture.detectChanges();

        expect(booksSpy).toHaveBeenCalled();
    });

    it('should create one li for each book', () => {
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(4);
    });

    it('should call delete method on book service with correct book', () => {
        fixture.detectChanges();
        const removedBook = BOOKS[0];
        component.delete(removedBook);

        expect(deleteSpy).toHaveBeenCalledWith(removedBook.key);
    });

    it('should navigate to dashboard when add button is clicked', () => {
        fixture.detectChanges();
        fixture.debugElement.query(By.css('#addBtn')).triggerEventHandler('click', null);

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

});

