import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {RouterModule, Routes} from '@angular/router';
import {NgxsModule} from '@ngxs/store';
import {AuthState} from './auth.state';
import { RegisterComponent } from './register/register.component';

export const AUTH_ROUTES: Routes = [
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AUTH_ROUTES),
    NgxsModule.forFeature([AuthState]),
  ],
  providers: [
    AuthGuard
  ],
  declarations: [LoginComponent, RegisterComponent],
})
export class AuthModule {
}
