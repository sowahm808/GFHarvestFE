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
  IonSpinner,
} from '@ionic/angular/standalone';
import { BibleQuizApiService } from '../services/bible-quiz-api.service';
import { BibleQuestion } from '../models/bible-quiz';
import { ToastController } from '@ionic/angular';

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
    IonSpinner
  ],
  templateUrl: './bible-quiz.page.html',
  styleUrls: ['./bible-quiz.page.scss'],
})
export class BibleQuizPage implements OnInit {
  question: BibleQuestion | null = null;
  answer = '';
  loading = false;

  constructor(private api: BibleQuizApiService, private toastCtrl: ToastController) {}

  ngOnInit() {
    this.loadQuiz();
  }

  loadQuiz() {
    this.loading = true;
    this.api.getTodayQuiz().subscribe({
      next: (q) => {
        this.question = q;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  submit() {
    if (!this.question) {
      console.error('No quiz question available');
      return;
    }
    this.api
      .submitQuiz({ question: this.question, answer: this.answer })
      .subscribe(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Quiz submitted',
          duration: 1500,
          position: 'bottom',
        });
        await toast.present();
      });
  }
}
