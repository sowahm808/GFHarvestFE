import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, switchMap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FirebaseService } from './firebase.service';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private root = environment.apiUrl.replace(/\/+$/, '');
  private baseUrl = `${this.root}${this.root.endsWith('/api') ? '' : '/api'}/users`;

  constructor(private http: HttpClient, private fb: FirebaseService) {}

  private withToken<T>(work: (token: string) => Observable<T>): Observable<T> {
    return from(this.fb.auth.currentUser?.getIdToken() ?? Promise.resolve('')).pipe(
      switchMap((token) => {
        if (!token) {
          return throwError(
            () => new Error('Missing auth token — are you logged in as an admin?')
          );
        }
        return work(token);
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.withToken((token) =>
      this.http.get<User[] | { users: User[] }>(this.baseUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).pipe(map((res) => (Array.isArray(res) ? res : res.users ?? [])));
  }

  assignRole(uid: string, role: string): Observable<unknown> {
    return this.withToken((token) => {
      const url =
        role === 'admin' ? `${this.baseUrl}/set-admin` : `${this.baseUrl}/assign-role`;
      const body = role === 'admin' ? { uid } : { uid, role };
      return this.http.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    });
  }
}
