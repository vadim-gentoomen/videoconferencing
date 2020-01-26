import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';


@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  // constructor(private authenticationService: AuthenticationService) {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let currentUser = this.authenticationService.currentUserValue;
    const currentUser = {token: ''};
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}
