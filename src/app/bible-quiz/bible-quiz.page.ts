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
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';

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
  ],
  templateUrl: './bible-quiz.page.html',
  styleUrls: ['./bible-quiz.page.scss'],
})
export class BibleQuizPage implements OnInit {
  question: any = null;
  answer = '';

  constructor(private fb: FirebaseService) {}

  async ngOnInit() {
    this.question = await this.fb.getRandomBibleQuestion();
  }

  async submit() {
    const user = this.fb.auth.currentUser;
    await this.fb.saveBibleQuiz({
      question: this.question,
      answer: this.answer,
      score: 200,
      userId: user ? user.uid : null,
      date: new Date().toISOString(),
    });
    console.log('Quiz saved');
  }
}
