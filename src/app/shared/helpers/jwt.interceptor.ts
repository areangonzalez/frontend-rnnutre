import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService, AuthenticationService } from "../../core/services";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (this._authenticationService.loggedIn()) {
          let currentUser = this._authenticationService.getUser()
          if (currentUser && currentUser.token) {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${currentUser.token}`
              }
            });
          }
        }
        return next.handle(request);
    }
}
