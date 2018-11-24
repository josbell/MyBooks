import { SharedModule } from './../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Input, Directive } from '@angular/core';

import { BookComponent } from './book.component';
import { By } from '@angular/platform-browser';
import { Book } from '../../core/book';
import { AppMaterialModule } from '../../shared/app-material.module';

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

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule],
      declarations: [BookComponent, RouterLinkDirectiveStub ]
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
    component.book = new Book({ id: '1', title: 'Book Name Test' });
    spyOn(component, 'onDeleteClick');
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', {});

    expect(component.onDeleteClick).toHaveBeenCalled();
  });

  it('should emit delete event when onDeleteClick is called', () => {
    spyOn(component.delete, 'emit');
    component.onDeleteClick();

    expect(component.delete.emit).toHaveBeenCalledWith('');
  });

  it('should navigate to correct route when clicked', () => {
    component.book = new Book({ id: '1', title: 'Book Name Test' });
    fixture.detectChanges();

    const routerLink = fixture.debugElement
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    fixture.debugElement.query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigatedTo).toBe('/detail/1');
  });
});
