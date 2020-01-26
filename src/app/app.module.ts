import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxsModule} from '@ngxs/store';

import {environment} from '../environments/environment';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {AuthState} from './auth/store/auth.state';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from './auth';
import {SharedModule} from './shared';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from '@auth/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,

    NgxsModule.forRoot([AuthState]),
    NgxsStoragePluginModule.forRoot({
      key: 'auth'
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),

    // my modules
    AuthModule,
    SharedModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
