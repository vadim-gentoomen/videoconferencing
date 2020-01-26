import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {AuthState} from './store';

import {NgxsModule} from '@ngxs/store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forFeature([AuthState]),
  ],
  declarations: [LoginComponent],
  providers: []
})
export class AuthModule {
}
