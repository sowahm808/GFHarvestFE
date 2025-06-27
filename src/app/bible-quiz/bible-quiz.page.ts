import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonButton,
  IonRadio,
  IonRadioGroup,
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { BibleQuizApiService } from '../services/bible-quiz-api.service';
import { BibleQuestion } from '../models/bible-quiz';

@Component({
  selector: 'app-bible-quiz',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    IonButton,
    IonRadio,
    IonRadioGroup,
  ],
  templateUrl: './bible-quiz.page.html',
  styleUrls: ['./bible-quiz.page.scss'],
})
export class BibleQuizPage implements OnInit {
  question: BibleQuestion | null = null;
  answer = '';

  constructor(
    private fb: FirebaseService,
    private api: BibleQuizApiService
  ) {}

  ngOnInit() {
    this.api.getRandomQuestion().subscribe((q) => (this.question = q));
  }

  async submit() {
    if (!this.question) {
      console.error('No quiz question available');
      return;
    }
    const user = this.fb.auth.currentUser;
    await this.fb.saveBibleQuiz({
      question: this.question!,
      answer: this.answer,
      score: 200,
      userId: user ? user.uid : null,
      date: new Date().toISOString(),
    });
    console.log('Quiz saved');
  }
}
