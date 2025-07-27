import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FirebaseService } from './firebase.service';
import { MentorAssignment, MentorChildren } from '../models/mentor-assignment';

@Injectable({ providedIn: 'root' })
export class MentorApiService {
  private apiEnabled = !!environment.apiUrl;
  private readonly baseUrl = `${environment.apiUrl}/api/mentors`;

  constructor(private http: HttpClient, private fb: FirebaseService) {}

  assignMentor(data: MentorAssignment): Observable<unknown> {
    if (!this.apiEnabled) {
      return from(this.fb.assignMentor(data.mentorId, data.childId));
    }

    return this.http.post(`${this.baseUrl}/assign`, data).pipe(
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

    return this.http
      .get<MentorChildren>(`${this.baseUrl}/${mentorId}/children`)
      .pipe(
        catchError((err) => {
          console.error('Failed to fetch mentor children via API, falling back', err);
          return from(this.fb.getChildForMentor(mentorId)).pipe(
            map((children) => ({ children }))
          );
        })
      );
  }
}
