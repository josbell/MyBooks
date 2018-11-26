import { Location } from '@angular/common';
import { fakeAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { routes } from './app-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BookDetailComponent } from './read-books/book-detail/book-detail.component';
import { BookListComponent } from './read-books/book-list/book-list.component';

@Component({
    selector: 'app-nav-bar',
    template: '<router-outlet></router-outlet>'
})
export class FakeAppComponent {}


describe('App Routing', () => {
    let location: Location;
    let router: Router;
    let fixture: ComponentFixture<FakeAppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            declarations: [
                FakeAppComponent,
                DashboardComponent,
                BookDetailComponent,
                BookListComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        router = TestBed.get(Router);
        location = TestBed.get(Location);
        fixture = TestBed.createComponent(FakeAppComponent);
        router.initialNavigation();
    });

    it('should redirect to location path "/book-list" when navigating to "" ', fakeAsync(() => {
        router.navigate(['']).then(() => expect(location.path()).toBe('/book-list'));
    }));

    it('should location path should be "/book-list" when navigating to "/book-list" ', fakeAsync(() => {
        router.navigate(['/book-list']).then(() => expect(location.path()).toBe('/book-list'));
    }));

    it('should location path should be "/dashboard" when navigating to "/dashboard" ', fakeAsync(() => {
        router.navigate(['/dashboard']).then(() => expect(location.path()).toBe('/dashboard'));
    }));

    it('should location path should be "/book-detail/:id" when navigating to "/book-detail/:id" ', fakeAsync(() => {
        router.navigate(['/book-detail/1']).then(() => expect(location.path()).toBe('/book-detail/1'));
    }));
});
