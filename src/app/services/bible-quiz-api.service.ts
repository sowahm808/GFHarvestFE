import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BibleQuestion } from '../models/bible-quiz';

@Injectable({ providedIn: 'root' })
export class BibleQuizApiService {
  constructor(private http: HttpClient) {}

  getRandomQuestion(): Observable<BibleQuestion> {
    return this.http.get<BibleQuestion>(`${environment.apiUrl}/bible-quiz/random`);
  }
}
