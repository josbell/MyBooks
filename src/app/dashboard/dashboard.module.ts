import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [

    ],
    declarations: [DashboardComponent, BookSearchComponent]
})
export class DashboardModule { }
