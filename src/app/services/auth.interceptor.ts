import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private fb: FirebaseService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.fb.auth.currentUser;
    if (!user) {
      return next.handle(req);
    }
    return from(user.getIdToken()).pipe(
      switchMap((token) => {
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next.handle(authReq);
      })
    );
  }
}
