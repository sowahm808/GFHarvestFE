import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Church } from '../models/church';

@Injectable({ providedIn: 'root' })
export class ChurchApiService {
  private apiEnabled = !!environment.apiUrl;
  private readonly baseUrl = `${environment.apiUrl}/churches`;
  private fallback: Church[] = [];

  constructor(private http: HttpClient) {}

  list(): Observable<Church[]> {
    if (!this.apiEnabled) {
      return of(this.fallback);
    }
    return this.http.get<Church[]>(this.baseUrl);
  }

  create(church: { name: string; logoUrl: string }): Observable<Church> {
    if (!this.apiEnabled) {
      const newChurch: Church = { id: `${Date.now()}`, ...church };
      this.fallback.push(newChurch);
      return of(newChurch);
    }
    return this.http.post<Church>(this.baseUrl, church);
  }
}
