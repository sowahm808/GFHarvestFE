import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BibleQuestion, BibleQuizResult } from '../models/bible-quiz';
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class BibleQuizApiService {
  /** Flag indicating whether REST API calls should be attempted. */
  private apiEnabled = !!environment.apiUrl;

  constructor(private http: HttpClient, private fb: FirebaseService) {}

  /**
  * All quiz related endpoints are served directly under the backend base URL.
  */
  getTodayQuiz(): Observable<BibleQuestion> {
    if (!this.apiEnabled) {
      return from(this.fb.getRandomBibleQuestion()).pipe(
        map((q) => q as BibleQuestion)
      );
    }

    return this.http
      .get<BibleQuestion>(`${environment.apiUrl}/quizzes/today`)
      .pipe(
        timeout(5000),
        catchError(() =>
          from(this.fb.getRandomBibleQuestion()).pipe(
            map((q) => q as BibleQuestion)
          )
        )
      );
  }

  submitQuiz(data: { question: BibleQuestion; answer: string }): Observable<unknown> {
    const score = this.fb.gradeQuizAnswer(data.question, data.answer);

    if (!this.apiEnabled) {
      const result: BibleQuizResult = {
        question: data.question,
        answer: data.answer,
        score,
        childId: this.fb.auth.currentUser?.uid || null,
        date: new Date().toISOString(),
      };
      return from(this.fb.saveBibleQuiz(result));
    }

    const payload = {
      childId: this.fb.auth.currentUser?.uid || null,
      quizId: data.question.id,
      answers: [data.answer],
    };
    return this.http
      .post(`${environment.apiUrl}/quizzes/submit`, payload)
      .pipe(
        timeout(5000),
        catchError(() => {
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
    if (!this.apiEnabled) {
      return from(this.fb.getBibleQuizHistory(childId));
    }

    return this.http
      .get<BibleQuizResult[]>(`${environment.apiUrl}/quizzes/${childId}/history`)
      .pipe(
        timeout(5000),
        catchError(() => from(this.fb.getBibleQuizHistory(childId)))
      );
  }
}
