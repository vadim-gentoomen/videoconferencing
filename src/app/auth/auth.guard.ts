import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngxs/store';
import {AuthState} from './auth.state';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {LoginRedirect} from './auth.actions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.selectOnce(AuthState.isAuthenticated)
      .pipe(
        tap(console.log),
        map((isAuth: boolean) => {
          if (!isAuth) {
            this.store.dispatch(new LoginRedirect());
          }

          return true;
        })
      );
  }
}
