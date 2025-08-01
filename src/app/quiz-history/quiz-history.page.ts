import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  
  
  
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { BibleQuizApiService } from '../services/bible-quiz-api.service';
import { FirebaseService } from '../services/firebase.service';
import { BibleQuizResult } from '../models/bible-quiz';

@Component({
  selector: 'app-quiz-history',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
  ],
  templateUrl: './quiz-history.page.html',
  styleUrls: ['./quiz-history.page.scss'],
})
export class QuizHistoryPage implements OnInit {
  results: BibleQuizResult[] = [];
  correctResults: BibleQuizResult[] = [];
  wrongResults: BibleQuizResult[] = [];
  totalScore = 0;

  constructor(
    private api: BibleQuizApiService,
    private fb: FirebaseService
  ) {}

  async ngOnInit() {
    await this.loadHistory();
  }

  async ionViewWillEnter() {
    await this.loadHistory();
  }

  private async loadHistory() {
    const user = this.fb.auth.currentUser;
    if (!user) {
      this.results = [];
      this.correctResults = [];
      this.wrongResults = [];
      this.totalScore = 0;
      return;
    }
    const history = await firstValueFrom(this.api.getHistory(user.uid));
    const map = new Map<string, BibleQuizResult>();

    for (const r of history) {
      const key =
        r.question.id || r.question.text || r.question.question || '';
      const existing = map.get(key);
      if (!existing || r.score > existing.score) {
        map.set(key, r);
      }
    }

    this.results = Array.from(map.values());
    this.correctResults = this.results.filter((r) => r.score > 0);
    this.wrongResults = this.results.filter((r) => r.score === 0);
    this.totalScore = this.results.reduce((sum, r) => sum + r.score, 0);
    console.log('History:', this.results);
  }
}
