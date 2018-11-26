import * as firebase from 'firebase/app';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private ngZone: NgZone) {
      this.user$ = this.afAuth.authState;
     }

    login() {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(_ => this.ngZone.run(() => this.router.navigate(['/book-list'])))
      .catch(error => console.log('auth error', error));
    }

    logout() {
      this.ngZone.run(() => this.router.navigate(['/'])
        .then(() => {
          firebase.database().goOffline();
          this.afAuth.auth.signOut();
        })
      );
    }
}
