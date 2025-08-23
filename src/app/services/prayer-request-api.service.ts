import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { PrayerRequest } from '../models/prayer-request';

@Injectable({ providedIn: 'root' })
export class PrayerRequestApiService {
  private apiEnabled = !!environment.apiUrl;
  private readonly baseUrl = `${environment.apiUrl}/prayerRequests`;
  private fallback: PrayerRequest[] = [];

  constructor(private http: HttpClient) {}

  list(): Observable<PrayerRequest[]> {
    if (!this.apiEnabled) {
      return of(this.fallback);
    }
    return this.http.get<PrayerRequest[]>(this.baseUrl);
  }

  create(req: { userId: string; text: string }): Observable<PrayerRequest> {
    if (!this.apiEnabled) {
      const newReq: PrayerRequest = {
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
        prayedAt: null,
        ...req,
      };
      this.fallback.push(newReq);
      return of(newReq);
    }
    return this.http.post<PrayerRequest>(this.baseUrl, req);
  }

  markPrayed(id: string): Observable<{ id: string; prayedAt: string }> {
      if (!this.apiEnabled) {
        const timestamp = new Date().toISOString();
        const req = this.fallback.find(r => r.id === id);
        if (req) {
          req.prayedAt = timestamp;
        }
        return of({ id, prayedAt: timestamp });
      }
      return this.http.patch<{ id: string; prayedAt: string }>(`${this.baseUrl}/${id}/prayed`, {});
  }
}
