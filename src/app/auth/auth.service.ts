import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AuthStateModel} from './store';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login({username, password}): Observable<any> { // Observable<AuthStateModel>
    return this.http.post(AUTH_API + 'signin', {username, password}, httpOptions);
  }

  logout(token: string): Observable<null> {
    return of(null);
  }
}
