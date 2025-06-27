import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MentorApiService {
  constructor(private http: HttpClient) {}
 assignMentor(data: { mentorId: string; childId: string }): Observable<unknown> {
   return this.http.post(`${environment.apiUrl}/api/mentors/assign`, data);
  }
 getChildren(mentorId: string): Observable<{ children: string[] }> {
   return this.http.get<{ children: string[] }>(
    `${environment.apiUrl}/api/mentors/${mentorId}/children`
  );
 }
}