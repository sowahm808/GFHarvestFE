import { Component } from '@angular/core';
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
  IonPage,
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { AcademicProgressEntry } from '../models/academic-progress';

@Component({
  selector: 'app-academic-progress',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonPage,
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
  templateUrl: './academic-progress.page.html',
  styleUrls: ['./academic-progress.page.scss'],
})
export class AcademicProgressPage {
  form: Omit<AcademicProgressEntry, 'userId' | 'date'> = {
    testScore: null as number | null,
    shareResult: false,
    needsHelp: false,
  };

  constructor(private fb: FirebaseService) {}

  async submit() {
    const user = this.fb.auth.currentUser;
    await this.fb.saveAcademicProgress({
      ...this.form,
      userId: user ? user.uid : null,
      date: new Date().toISOString(),
    });
    console.log('Academic progress saved');
  }
}
