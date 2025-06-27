import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonText,
} from '@ionic/angular/standalone';
import { IonPage } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { BibleQuestion } from '../models/bible-quiz';

@Component({
  selector: 'app-bible-quiz',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    IonButton,
    IonRadio,
    IonRadioGroup,
    IonText,
  ],
  templateUrl: './bible-quiz.page.html',
  styleUrls: ['./bible-quiz.page.scss'],
})
export class BibleQuizPage implements OnInit {
  question: BibleQuestion | null = null;
  answer = '';

  constructor(private fb: FirebaseService) {}

  ngOnInit() {
    this.fb
      .getRandomBibleQuestion()
      .then((q) => (this.question = q));
  }

  async submit() {
    if (!this.question) {
      console.error('No quiz question available');
      return;
    }
    const user = this.fb.auth.currentUser;
    const correctAnswer = (this.question.answer || '').trim().toLowerCase();
    const userAnswer = this.answer.trim().toLowerCase();
    await this.fb.saveBibleQuiz({
      question: this.question,
      answer: this.answer,
      score: correctAnswer && userAnswer === correctAnswer ? 200 : 0,
      childId: user ? user.uid : null,
      date: new Date().toISOString(),
    });
    console.log('Quiz submitted');
  }
}
