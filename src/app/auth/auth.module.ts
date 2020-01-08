import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {NgxsModule} from '@ngxs/store';
import {AuthState} from './store';

export const AUTH_ROUTES: Routes = [
  {path: 'auth/login', component: LoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AUTH_ROUTES),
    NgxsModule.forFeature([AuthState]),
  ],
  providers: [],
  declarations: [LoginComponent],
})
export class AuthModule {
}
