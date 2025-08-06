import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        let message = 'An unexpected error occurred';
        if (err.status === 400) {
          message = 'Bad request';
        } else if (err.status === 404) {
          message = 'Resource not found';
        } else if (err.status === 0) {
          message = 'Network error';
        }
        this.errorService.presentError(message);
        return throwError(() => err);
      })
    );
  }
}
