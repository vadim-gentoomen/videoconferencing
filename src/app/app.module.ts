import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxsModule} from '@ngxs/store';

import {environment} from '../environments/environment';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {AuthState} from './auth/auth.state';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {AuthModule} from './auth/auth.module';
import {HomeModule} from './home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NgxsModule.forRoot([AuthState]),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.token'
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),

    // my modules
    AuthModule,
    // HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
