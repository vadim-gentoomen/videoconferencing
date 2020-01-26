import {Action, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store';
import {AuthStateModel} from './auth.model';
import {catchError, first, tap} from 'rxjs/operators';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {CheckSession, Login, LoginFailed, LoginRedirect, LoginSuccess, Logout, LogoutSuccess} from './auth.actions';
import {Navigate} from '@ngxs/router-plugin';
import {throwError, timer} from 'rxjs';

const authStateDefaults: AuthStateModel = {
  id: null,
  username: null,
  roles: [],
  accessToken: null,
  tokenType: null,
  initialized: false,
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: authStateDefaults
})
export class AuthState implements NgxsOnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Dispatch CheckSession on start
   */
  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new CheckSession());
  }

  /**
   * Selectors
   */
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.accessToken;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.accessToken;
  }

  @Selector()
  static getInitialized(state: AuthStateModel): boolean {
    return state.initialized;
  }

  /**
   * Commands
   */
  @Action(CheckSession)
  checkSession(ctx: StateContext<AuthStateModel>) {
    // эмуляция инициализации чего либо
    return timer(1000)
      .pipe(
        first(),
        tap(() => {
          ctx.patchState({initialized: true});
        })
      );
  }

  @Action(Login)
  login({setState, patchState, dispatch}: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload)
      .pipe(
        catchError((err) => {
          setState(authStateDefaults);
          dispatch(new LoginFailed(err));
          return throwError(err);
        }),
        tap(({id, roles, accessToken, tokenType}) => {
          patchState({
            id, roles, accessToken, tokenType,
            username: action.payload.username,
          });
          dispatch(new LoginSuccess());
        })
      );
  }

  @Action(Logout)
  logout({getState, setState}: StateContext<AuthStateModel>) {
    return this.authService.logout(getState().accessToken)
      .pipe(
        tap(() => {
          setState(authStateDefaults);
        })
      );
  }

  @Action(LoginSuccess)
  onLoginSuccess({dispatch}: StateContext<AuthStateModel>) {
    console.log('onLoginSuccess, navigating to /');
    dispatch(new Navigate(['/']));
  }

  @Action(LoginRedirect)
  onLoginRedirect({dispatch}: StateContext<AuthStateModel>) {
    console.log('onLoginRedirect, navigating to /login');
    dispatch(new Navigate(['/login']));
  }

  @Action([LoginFailed, LogoutSuccess])
  setUserStateOnFailure({setState, dispatch}: StateContext<AuthStateModel>) {
    setState(authStateDefaults);
    dispatch(new LoginRedirect());
  }
}
