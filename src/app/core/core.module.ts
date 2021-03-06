import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { GoogleBooksService } from './google-books.service';
import { FirebaseDBService } from './firebase-db.service';
import { environment } from '../../environments/environment';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatTabsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  declarations: [NavBarComponent],
  exports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    NavBarComponent
  ],
  providers: [
    GoogleBooksService,
    FirebaseDBService,
    AuthService,
    AuthGuard
  ]
})
export class CoreModule { }
