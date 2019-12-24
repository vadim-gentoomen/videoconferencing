import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AuthStateModel} from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
  }

  login({username, password}): Observable<AuthStateModel> {
    /*
      This will pressumably call a http backend and return the response
      return this.http.post<{{ username: string; email: string }}>(url, { email: email, password: password })
      .pipe(
        map(res => res.body)
      )
      */

    return of({token: 'some-token', username: 'Some Name'});
  }

  logout(token: string): Observable<null> {
    return of(null);
  }
}
