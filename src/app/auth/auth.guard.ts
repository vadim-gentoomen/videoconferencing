import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthState, LoginRedirect} from '@auth/store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.selectOnce(AuthState.isAuthenticated)
      .pipe(
        map((isAuth: boolean) => {
          console.log('isAuth ' + isAuth);
          if (isAuth) {
            return true;
          }
          this.store.dispatch(new LoginRedirect());
          return false;
        })
      );
  }
}
