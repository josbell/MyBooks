import { SharedModule } from './../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BookComponent } from './book.component';
import { By } from '@angular/platform-browser';
import { Book } from '../../core/book';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ BookComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct book', () => {
    component.book = new Book({id: '1', title: 'Book Name Test'});

    expect(component.book.title).toEqual('Book Name Test');
  });

  it('should render the book title', () => {
    component.book = new Book({id: '1', title: 'Book Name Test'});
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Book Name Test');
  });

  it('should call onDeleteClick method when delete button clicked', () => {
    spyOn(component, 'onDeleteClick');
    fixture.debugElement.query(By.css('button.delete')).triggerEventHandler('click', {});

    expect(component.onDeleteClick).toHaveBeenCalled();
  });

  it('should emit delete event when onDeleteClick is called', () => {
    spyOn(component.delete, 'emit');
    component.onDeleteClick();

    expect(component.delete.emit).toHaveBeenCalledWith('');
  });
});
