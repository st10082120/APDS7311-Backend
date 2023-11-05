import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authservice: AuthServiceService) { }
  //ensures the correct header and token is used
  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const authToken = this.authservice.getToken();

    if (authToken) {
      const authRequest = request.clone({
        setHeaders: {
          'x-auth-token': authToken
        }
      });

      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}
//---------------------------------End of File---------------------------------------\\