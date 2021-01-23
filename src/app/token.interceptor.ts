import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Auth interceptor');
    console.log(request.url);
    const val=localStorage.getItem('token')
    const authToken = "3656587hgbii788709bjkjmk988b";
    const authReq = request.clone({ setHeaders: { Authorization: authToken } });

    return next.handle(authReq);
    //return next.handle(request);
  }
}
