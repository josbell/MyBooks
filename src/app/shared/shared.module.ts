import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule } from './app-material.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
        FlexLayoutModule,
        FormsModule,
        NgSelectModule,
        RouterModule,
        HttpClientModule
    ],
    declarations: [],
    exports: [
        CommonModule,
        AppMaterialModule,
        FlexLayoutModule,
        FormsModule,
        NgSelectModule,
        RouterModule,
        HttpClientModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        // Forcing the whole app to use the returned providers from the AppModule only.
        return {
            ngModule: SharedModule,
            providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
        };
    }
}
