import { SharedModule } from './../../shared/shared.module';
import { By } from '@angular/platform-browser';
import { BookComponent } from './../book/book.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { Book } from '../../core/book';
import { BookService } from '../book.service';
import { of } from 'rxjs';
import { Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';

@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: string;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe('BookListComponent', () => {
    let component: BookListComponent;
    let fixture: ComponentFixture<BookListComponent>;
    let BOOKS: Book[];
    let mockBookService;


    beforeEach(() => {
        BOOKS = [];
        for (let index = 1; index < 5; index++) {
            BOOKS.push(new Book({id: index, title: 'Book Name Test ' + index}));
        }
        mockBookService = jasmine.createSpyObj(['delete', 'books']);
        mockBookService.getBooks.and.returnValue(of(BOOKS));
        mockBookService.delete.and.returnValue(of(true));
        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [
                BookListComponent,
                BookComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                { provide: BookService, useValue: mockBookService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BookListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create one li for each book', () => {
        mockBookService.books.and.returnValue(BOOKS);
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(4);
    });

    it('should remove book from books list when delete method gets called', () => {
        mockBookService.books.and.returnValue(BOOKS);
        fixture.detectChanges(); // Get Books from Mock Service
        const removedBook = BOOKS[0];
        const newLength = BOOKS.length - 1;
        component.delete(removedBook);

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    });

    it('should call delete method on book service with correct book', () => {
        mockBookService.books.and.returnValue(BOOKS);
        fixture.detectChanges();
        const removedBook = BOOKS[0];
        component.delete(removedBook);

        expect(mockBookService.delete).toHaveBeenCalledWith(removedBook);
    });

    it('should have the correct route for the first book', () => {
        mockBookService.books.and.returnValue(BOOKS);
        fixture.detectChanges();
        const bookComponents = fixture.debugElement.queryAll(By.directive(BookComponent));

        // Get mock router from first book component
        const routerLink = bookComponents[0]
            .query(By.directive(RouterLinkDirectiveStub))
            .injector.get(RouterLinkDirectiveStub);

        bookComponents[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(routerLink.navigatedTo).toBe('/detail/1');
    });

});

