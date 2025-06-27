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
} from '@ionic/angular/standalone';
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
    await this.fb.saveBibleQuiz({
      questionId: this.question.id,
      answer: this.answer,
      userId: user ? user.uid : null,
    });
    console.log('Quiz submitted');
  }
}
