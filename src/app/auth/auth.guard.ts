import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AuthState, LoginRedirect} from '@auth/store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.selectOnce(AuthState.isAuthenticated)
      .pipe(
        map((isAuth: boolean) => {
          if (!isAuth) {
            this.store.dispatch(new LoginRedirect());
          }
          return isAuth;
        })
      );
  }
}
