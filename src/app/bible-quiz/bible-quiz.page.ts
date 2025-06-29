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
import { forkJoin } from 'rxjs';
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
  questions: BibleQuestion[] = [];
  currentIndex = 0;
  answers: string[] = [];
  loading = false;

  get currentQuestion(): BibleQuestion | null {
    return this.questions[this.currentIndex] || null;
  }

  constructor(private api: BibleQuizApiService, private toastCtrl: ToastController) {}

  ngOnInit() {
    this.loadQuiz();
  }

  loadQuiz() {
    this.loading = true;
    this.api.getTodayQuizzes(5).subscribe({
      next: (qs) => {
        this.questions = qs;
        this.currentIndex = 0;
        this.answers = new Array(qs.length).fill('');
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  allAnswered(): boolean {
    return (
      this.answers.length === this.questions.length &&
      this.answers.every((a) => !!a && a.trim().length > 0)
    );
  }

  submitAll() {
    const submissions = this.questions.map((q, idx) =>
      this.api.submitQuiz({ question: q, answer: this.answers[idx] })
    );

    forkJoin(submissions).subscribe(async () => {
      const toast = await this.toastCtrl.create({
        message: "You've completed today's quiz!",
        duration: 2000,
        position: 'bottom',
      });
      await toast.present();
      this.currentIndex = 0;
      this.answers = new Array(this.questions.length).fill('');
    });
  }
}
