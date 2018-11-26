import { AuthService } from './auth.service';
import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone) {}

  canActivate(): Observable<boolean> {
    return this.authService.user$
      .pipe(
        map(user => user && user.uid ? true : this.redirect())
      );
  }

  redirect() {
    this.ngZone.run(() => this.router.navigate(['']));
    return false;
  }
}
