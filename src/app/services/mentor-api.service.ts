import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FirebaseService } from './firebase.service';
import { MentorAssignment, MentorChildren } from '../models/mentor-assignment';
import { MentorProfile } from '../models/mentor-profile';
import { ChildProfile } from '../models/child-profile';

@Injectable({ providedIn: 'root' })
export class MentorApiService {
  private apiEnabled = !!environment.apiUrl;
  private readonly baseUrl = `${environment.apiUrl}/api/mentors`;
  private readonly childBaseUrl = `${environment.apiUrl}/api/children`;

  constructor(private http: HttpClient, private fb: FirebaseService) {}

  createMentor(data: MentorProfile): Observable<MentorProfile> {
    if (!this.apiEnabled) {
      return from(this.fb.createMentor(data.name, data.email, data.phone));
    }

    const token$ = from(
      this.fb.auth.currentUser?.getIdToken() ?? Promise.resolve('')
    );

    return token$.pipe(
      switchMap((token) =>
        this.http.post<MentorProfile>(`${this.baseUrl}/create`, data, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
      ),
      catchError((err) => {
        console.error('Failed to create mentor via API, falling back', err);
        return from(this.fb.createMentor(data.name, data.email, data.phone));
      })
    );
  }

  getMentors(): Observable<MentorProfile[]> {
    if (!this.apiEnabled) {
      return from(this.fb.getMentors());
    }

    const token$ = from(
      this.fb.auth.currentUser?.getIdToken() ?? Promise.resolve('')
    );

    return token$.pipe(
      switchMap((token) =>
        this.http.get<MentorProfile[]>(this.baseUrl, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
      ),
      catchError((err) => {
        console.error('Failed to fetch mentors via API, falling back', err);
        return from(this.fb.getMentors());
      })
    );
  }

  getChildProfiles(): Observable<ChildProfile[]> {
    if (!this.apiEnabled) {
      return from(this.fb.getAllChildren());
    }

    const token$ = from(
      this.fb.auth.currentUser?.getIdToken() ?? Promise.resolve('')
    );

    return token$.pipe(
      switchMap((token) =>
        this.http.get<ChildProfile[]>(this.childBaseUrl, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
      ),
      catchError((err) => {
        console.error('Failed to fetch children via API, falling back', err);
        return from(this.fb.getAllChildren());
      })
    );
  }

  assignMentor(data: MentorAssignment): Observable<unknown> {
    if (!this.apiEnabled) {
      return from(this.fb.assignMentor(data.mentorId, data.childId));
    }

    // Manually attach the Firebase auth token as the backend expects an
    // Authorization header. Using the interceptor should handle this, but
    // attaching here avoids 403 responses when the interceptor is skipped.
    const token$ = from(
      this.fb.auth.currentUser?.getIdToken() ?? Promise.resolve('')
    );

    return token$.pipe(
      switchMap((token) =>
        this.http.post(`${this.baseUrl}/assign`, data, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
      ),
      catchError((err) => {
        console.error('Failed to assign mentor via API, falling back', err);
        return from(this.fb.assignMentor(data.mentorId, data.childId));
      })
    );
  }

  getChildren(mentorId: string): Observable<MentorChildren> {
    if (!this.apiEnabled) {
      return from(this.fb.getChildForMentor(mentorId)).pipe(
        map((children) => ({ children }))
      );
    }

    const token$ = from(
      this.fb.auth.currentUser?.getIdToken() ?? Promise.resolve('')
    );

    return token$.pipe(
      switchMap((token) =>
        this.http.get<MentorChildren>(`${this.baseUrl}/${mentorId}/children`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
      ),
      catchError((err) => {
        console.error('Failed to fetch mentor children via API, falling back', err);
        return from(this.fb.getChildForMentor(mentorId)).pipe(
          map((children) => ({ children }))
        );
      })
    );
  }
}
