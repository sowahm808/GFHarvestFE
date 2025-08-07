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
    // Resolve the current user's ID token. If the auth state has not yet been
    // loaded, wait for it so that authenticated requests still include the
    // appropriate Authorization header.
    const tokenPromise = this.fb.auth.currentUser
      ? this.fb.auth.currentUser.getIdToken()
      : new Promise<string | null>((resolve) => {
          const unsubscribe = this.fb.auth.onAuthStateChanged(async (user) => {
            unsubscribe();
            resolve(user ? await user.getIdToken() : null);
          });
        });

    return from(tokenPromise).pipe(
      switchMap((token) => {
        const authReq = token
          ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
          : req;
        return next.handle(authReq);
      })
    );
  }
}
