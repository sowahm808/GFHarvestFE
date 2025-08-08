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
  // Mentor record endpoints live under the mentors route on the backend. The
  // backend prefixes routes with `/api`, so environment.apiUrl should include it.
  private readonly baseUrl = `${environment.apiUrl}/mentors`;

  constructor(private http: HttpClient, private fb: FirebaseService) {}

  getRecords(uid: string): Observable<MentorRecord[]> {
    if (!this.apiEnabled) {
      return from(this.fb.getMentorRecords(uid));
    }
    return this.http
      .get<MentorRecord[]>(`${this.baseUrl}/${uid}/records`)
      .pipe(catchError(() => from(this.fb.getMentorRecords(uid))));
  }

  createRecord(record: MentorRecord): Observable<unknown> {
    if (!this.apiEnabled) {
      return from(this.fb.saveMentorRecord(record));
    }
    return this.http
      .post(`${this.baseUrl}/records`, record)
      .pipe(catchError(() => from(this.fb.saveMentorRecord(record))));
  }
}
