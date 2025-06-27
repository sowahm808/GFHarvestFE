import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class MentorApiService {
  constructor(private http: HttpClient, private fb: FirebaseService) {}

  assignMentor(data: { mentorId: string; childId: string }): Observable<unknown> {
    return this.http
      .post(`${environment.apiUrl}/api/mentors/assign`, data)
      .pipe(
        catchError(() =>
          from(this.fb.assignMentor(data.mentorId, data.childId))
        )
      );
  }

  getChildren(mentorId: string): Observable<{ children: string[] }> {
    return this.http
      .get<{ children: string[] }>(
        `${environment.apiUrl}/api/mentors/${mentorId}/children`
      )
      .pipe(
        catchError(() =>
          from(this.fb.getChildForMentor(mentorId)).pipe(
            map((children) => ({ children }))
          )
        )
      );
  }
}