// import { SharedModule } from './../../shared/shared.module';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA, Input } from '@angular/core';

// import { BookComponent } from './book.component';
// import { By } from '@angular/platform-browser';
// import { Book } from '../../core/book';

// @Directive({
//   selector: '[routerLink]',
//   host: { '(click)': 'onClick()' }
// })
// export class RouterLinkDirectiveStub {
//   @Input('routerLink') linkParams: string;
//   navigatedTo: any = null;

//   onClick() {
//     this.navigatedTo = this.linkParams;
//   }
// }

// describe('BookComponent', () => {
//   let component: BookComponent;
//   let fixture: ComponentFixture<BookComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [SharedModule, RouterLinkDirectiveStub],
//       declarations: [ BookComponent ],
//       schemas: [NO_ERRORS_SCHEMA],
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(BookComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have the correct book', () => {
//     component.book = new Book({id: '1', title: 'Book Name Test'});

//     expect(component.book.title).toEqual('Book Name Test');
//   });

//   it('should render the book title', () => {
//     component.book = new Book({id: '1', title: 'Book Name Test'});
//     fixture.detectChanges();

//     expect(fixture.nativeElement.textContent).toContain('Book Name Test');
//   });

//   it('should call onDeleteClick method when delete button clicked', () => {
//     spyOn(component, 'onDeleteClick');
//     fixture.debugElement.query(By.css('button.delete')).triggerEventHandler('click', {});

//     expect(component.onDeleteClick).toHaveBeenCalled();
//   });

//   it('should emit delete event when onDeleteClick is called', () => {
//     spyOn(component.delete, 'emit');
//     component.onDeleteClick();

//     expect(component.delete.emit).toHaveBeenCalledWith('');
//   });

//   it('should have the correct route', () => {
//     fixture.detectChanges();
//     const bookComponents = fixture.debugElement.queryAll(By.directive(BookComponent));

//     // Get mock router from first book component
//     const routerLink = bookComponents[0]
//       .query(By.directive(RouterLinkDirectiveStub))
//       .injector.get(RouterLinkDirectiveStub);

//     bookComponents[0].query(By.css('a')).triggerEventHandler('click', null);

//     expect(routerLink.navigatedTo).toBe('/detail/1');
//   });
// });
