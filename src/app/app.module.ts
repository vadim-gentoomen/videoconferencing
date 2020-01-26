import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxsModule} from '@ngxs/store';

import {environment} from '../environments/environment';
import {NgxsRouterPluginModule, RouterStateSerializer} from '@ngxs/router-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {CustomRouterStateSerializer} from './router/custom-router-state-serializer';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthState, AuthModule, JwtInterceptor, AuthGuard} from '@auth/index';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,

    NgxsModule.forRoot([AuthState]),
    NgxsStoragePluginModule.forRoot({
      key: ['auth']
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
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
    {provide: AuthGuard, useClass: AuthGuard}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
