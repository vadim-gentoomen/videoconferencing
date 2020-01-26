import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {NgxsModule} from '@ngxs/store';
import {AuthGuard} from '@auth/auth.guard';
import {AuthState} from '@auth/store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

export const AUTH_ROUTES: Routes = [
  {path: 'auth/login', component: LoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AUTH_ROUTES),
    NgxsModule.forFeature([AuthState]),
  ],
  declarations: [LoginComponent],
  providers: [AuthGuard],
})
export class AuthModule {
}
