import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
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
    IonHeader,
    IonToolbar,
    IonTitle,
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
      return;
    }
    this.results = await firstValueFrom(this.api.getHistory(user.uid));
    console.log('History:', this.results);
  }
}
