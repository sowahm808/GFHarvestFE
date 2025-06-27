import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BibleQuestion, BibleQuizResult } from '../models/bible-quiz';

@Injectable({ providedIn: 'root' })
export class BibleQuizApiService {
  constructor(private http: HttpClient) {}

  /**
   * All quiz related endpoints are served under the `/api` prefix.
   */
  getTodayQuiz(): Observable<BibleQuestion> {
    return this.http.get<BibleQuestion>(
      `${environment.apiUrl}/api/quizzes/today`
    );
  }

  submitQuiz(data: unknown): Observable<unknown> {
    return this.http.post(`${environment.apiUrl}/api/quizzes/submit`, data);
  }

  getHistory(childId: string): Observable<BibleQuizResult[]> {
    return this.http.get<BibleQuizResult[]>(
      `${environment.apiUrl}/api/quizzes/history/${childId}`
    );
  }
}
