import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, switchMap, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FirebaseService } from './firebase.service';
import { MentorAssignment, MentorChildren } from '../models/mentor-assignment';
import { MentorProfile } from '../models/mentor-profile';
import { ChildProfile } from '../models/child-profile';

@Injectable({ providedIn: 'root' })
export class MentorApiService {
  // Normalize base URL so both '.../api' and '...' work.
  private readonly root = environment.apiUrl.replace(/\/+$/, '');
  private readonly apiBase = `${this.root}${this.root.endsWith('/api') ? '' : '/api'}`;

  private readonly baseUrl = `${this.apiBase}/mentors`;
  private readonly childBaseUrl = `${this.apiBase}/children`;

  constructor(private http: HttpClient, private fb: FirebaseService) {
    // One-time debug to verify actual URL used at runtime
    // Remove after verifying
    // eslint-disable-next-line no-console
    console.log('[MentorApiService] baseUrl =', this.baseUrl);
  }

  private withToken<T>(work: (token: string) => Observable<T>): Observable<T> {
    const tokenPromise = this.fb.auth.currentUser
      ? this.fb.auth.currentUser.getIdToken()
      : new Promise<string>((resolve, reject) => {
          const unsub = this.fb.auth.onAuthStateChanged(
            (user) => {
              unsub();
              if (user) {
                user.getIdToken().then(resolve).catch(reject);
              } else {
                resolve('');
              }
            },
            reject
          );
        });

    return from(tokenPromise).pipe(
      switchMap((token) => {
        if (!token) {
          return throwError(() => new Error('Missing auth token — are you logged in as an admin?'));
        }
        return work(token);
      })
    );
  }

  createMentor(data: MentorProfile): Observable<MentorProfile> {
    return this.withToken((token) =>
      this.http.post<MentorProfile>(this.baseUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    ).pipe(
      catchError((err) => {
        console.error('createMentor API error', err);
        return throwError(() => err);
      })
    );
  }

  getMentors(): Observable<MentorProfile[]> {
    return this.withToken((token) =>
      this.http.get<MentorProfile[] | { mentors: MentorProfile[] }>(this.baseUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).pipe(
      map((res) => (Array.isArray(res) ? res : res.mentors ?? [])),
      catchError((err) => {
        console.error('getMentors API error', err);
        return from(this.fb.getMentors());
      })
    );
  }

  getChildProfiles(): Observable<ChildProfile[]> {
    return this.withToken((token) =>
      this.http.get<ChildProfile[] | { children: ChildProfile[] }>(
        this.childBaseUrl,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
    ).pipe(
      map((res) => (Array.isArray(res) ? res : res.children ?? [])),
      catchError((err) => {
        console.error('getChildProfiles API error', err);
        return throwError(() => err);
      })
    );
  }

  assignMentor(data: MentorAssignment): Observable<unknown> {
    return this.withToken((token) =>
      this.http.post(`${this.baseUrl}/assign`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    );
  }

  getChildren(mentorId: string): Observable<MentorChildren> {
    return this.withToken((token) =>
      this.http.get<MentorChildren>(`${this.baseUrl}/${mentorId}/children`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );
  }
}
