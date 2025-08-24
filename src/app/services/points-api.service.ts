import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FirebaseService } from './firebase.service';
import { UserStats } from '../models/user-stats';

@Injectable({ providedIn: 'root' })
export class PointsApiService {
  private apiEnabled = !!environment.apiUrl;
  private readonly baseUrl = `${environment.apiUrl}/points`;

  constructor(private http: HttpClient, private fb: FirebaseService) {}

  grantPoints(childId: string, points: number): Observable<unknown> {
    if (!this.apiEnabled) {
      return from(this.fb.addPoints(childId, points));
    }
    return this.http
      .post(`${this.baseUrl}/grant`, { childId, points })
      .pipe(timeout(5000), catchError(() => from(this.fb.addPoints(childId, points))));
  }

  getChildPoints(childId: string): Observable<UserStats | null> {
    if (!this.apiEnabled) {
      return from(this.fb.getUserStats(childId));
    }
    return this.http
      .get<UserStats>(`${this.baseUrl}/${childId}`)
      .pipe(timeout(5000), catchError(() => from(this.fb.getUserStats(childId))));
  }
}
