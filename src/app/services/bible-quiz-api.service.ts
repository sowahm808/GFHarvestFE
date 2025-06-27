import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BibleQuestion, BibleQuizResult } from '../models/bible-quiz';
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class BibleQuizApiService {
  constructor(private http: HttpClient, private fb: FirebaseService) {}

  /**
   * All quiz related endpoints are served under the `/api` prefix.
   */
  getTodayQuiz(): Observable<BibleQuestion> {
    return this.http
      .get<BibleQuestion>(`${environment.apiUrl}/api/quizzes/today`)
      .pipe(
        catchError(() =>
          from(this.fb.getRandomBibleQuestion()).pipe(
            map((q) => q as BibleQuestion)
          )
        )
      );
  }

  submitQuiz(data: { question: BibleQuestion; answer: string }): Observable<unknown> {
    const payload = {
      childId: this.fb.auth.currentUser?.uid || null,
      quizId: data.question.id,
      answers: [data.answer],
    };
    return this.http
      .post(`${environment.apiUrl}/api/quizzes/submit`, payload)
      .pipe(
        catchError(() => {
          const score = this.fb.gradeQuizAnswer(data.question, data.answer);
          const result: BibleQuizResult = {
            question: data.question,
            answer: data.answer,
            score,
            childId: this.fb.auth.currentUser?.uid || null,
            date: new Date().toISOString(),
          };
          return from(this.fb.saveBibleQuiz(result));
        })
      );
  }

  getHistory(childId: string): Observable<BibleQuizResult[]> {
    return this.http
      .get<BibleQuizResult[]>(`${environment.apiUrl}/api/quizzes/history/${childId}`)
      .pipe(
        catchError(() => from(this.fb.getBibleQuizHistory(childId)))
      );
  }
}
