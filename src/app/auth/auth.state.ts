import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AuthStateModel} from './auth.model';
import {tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Login, LoginFailed, LoginRedirect, LoginSuccess, Logout, LogoutSuccess} from './auth.actions';
import {Navigate} from '@ngxs/router-plugin';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null,
  }
})
export class AuthState {

  /**
   * Selectors
   */
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static getInitialized(state: AuthStateModel): boolean {
    return true;
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Commands
   */
  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload)
      .pipe(
        tap((result: { token: string }) => {
          console.log('login');
          ctx.patchState({
            token: result.token,
            username: action.payload.username
          });
        })
      );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this.authService.logout(state.token)
      .pipe(
        tap(() => {
          console.log('logout');
          ctx.setState({
            token: null,
            username: null
          });
        })
      );
  }

  @Action(LoginSuccess)
  onLoginSuccess(ctx: StateContext<AuthStateModel>) {
    console.log('onLoginSuccess, navigating to /home');
    ctx.dispatch(new Navigate(['/home']));
  }

  @Action(LoginRedirect)
  onLoginRedirect(ctx: StateContext<AuthStateModel>) {
    console.log('onLoginRedirect, navigating to /auth/login');
    ctx.dispatch(new Navigate(['/auth/login']));
  }

  @Action(LoginSuccess)
  setUserStateOnSuccess(ctx: StateContext<AuthStateModel>, event: LoginSuccess) {
    ctx.patchState({
      token: event.token
    });
  }

  @Action([LoginFailed, LogoutSuccess])
  setUserStateOnFailure(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      token: undefined
    });
    ctx.dispatch(new LoginRedirect());
  }
}
