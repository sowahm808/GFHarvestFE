import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { GroupPoints } from '../models/group-stats';
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class GroupApiService {
  private apiEnabled = !!environment.apiUrl;
  private readonly baseUrl = `${environment.apiUrl}/groups`;

  constructor(private http: HttpClient, private fb: FirebaseService) {}

  getGroupPoints(): Observable<GroupPoints[]> {
    if (!this.apiEnabled) {
      return from(this.fb.getGroupPointSnapshot());
    }
    return this.http
      .get<GroupPoints[]>(`${this.baseUrl}/points`)
      .pipe(timeout(5000), catchError(() => from(this.fb.getGroupPointSnapshot())));
  }
}
