import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FirebaseService } from './firebase.service';
import { MentorRecord } from '../models/mentor-record';

@Injectable({ providedIn: 'root' })
export class MentorRecordApiService {
  private apiEnabled = !!environment.apiUrl;
  private readonly baseUrl = `${environment.apiUrl}/api/mentors`;

  constructor(private http: HttpClient, private fb: FirebaseService) {}

  getRecords(childId: string): Observable<MentorRecord[]> {
    if (!this.apiEnabled) {
      return from(this.fb.getMentorRecords(childId));
    }
    return this.http
      .get<MentorRecord[]>(`${this.baseUrl}/${childId}/records`)
      .pipe(catchError(() => from(this.fb.getMentorRecords(childId))));
  }
}
