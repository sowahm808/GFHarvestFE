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
  private readonly baseUrl = `${environment.apiUrl}/api/mentor`;
  private readonly childBaseUrl = `${environment.apiUrl}/api/children`;

  constructor(private http: HttpClient, private fb: FirebaseService) {}

  createMentor(data: MentorProfile): Observable<MentorProfile> {
    const token$ = from(this.fb.auth.currentUser?.getIdToken() ?? Promise.resolve(''));
    return token$.pipe(
      switchMap(token =>
        this.http.post<MentorProfile>(this.baseUrl, data, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
      ),
      catchError(err => {
        console.error('createMentor API error', err);
        // optional fallback:
        // return from(this.fb.createMentor(data.name, data.email, data.phone));
        return throwError(() => err);
      })
    );
  }

  getMentors(): Observable<MentorProfile[]> {
    const token$ = from(this.fb.auth.currentUser?.getIdToken() ?? Promise.resolve(''));
    return token$.pipe(
      switchMap(token =>
        this.http.get<MentorProfile[]>(this.baseUrl, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
      ),
      catchError(err => throwError(() => err))
    );
  }

  getChildProfiles(): Observable<ChildProfile[]> {
    const token$ = from(this.fb.auth.currentUser?.getIdToken() ?? Promise.resolve(''));
    return token$.pipe(
      switchMap(token =>
        this.http.get<ChildProfile[]>(this.childBaseUrl, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
      ),
      catchError(err => throwError(() => err))
    );
  }

  assignMentor(data: MentorAssignment): Observable<unknown> {
    const token$ = from(this.fb.auth.currentUser?.getIdToken() ?? Promise.resolve(''));
    return token$.pipe(
      switchMap(token =>
        this.http.post(`${this.baseUrl}/assign`, data, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
      ),
      catchError(err => throwError(() => err))
    );
  }

  getChildren(mentorId: string): Observable<MentorChildren> {
    const token$ = from(this.fb.auth.currentUser?.getIdToken() ?? Promise.resolve(''));
    return token$.pipe(
      switchMap(token =>
        this.http.get<MentorChildren>(`${this.baseUrl}/${mentorId}/children`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
      ),
      catchError(err => throwError(() => err))
    );
  }
}
