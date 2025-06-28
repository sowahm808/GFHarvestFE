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
  IonCheckbox,
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { AcademicProgressEntry } from '../models/academic-progress';

@Component({
  selector: 'app-academic-progress',
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
    IonCheckbox,

  ],
  templateUrl: './academic-progress.page.html',
  styleUrls: ['./academic-progress.page.scss'],
})
export class AcademicProgressPage {
  form: Omit<AcademicProgressEntry, 'childId' | 'date'> = {
    testScore: null as number | null,
    shareResult: false,
    needsHelp: false,
  };

  constructor(private fb: FirebaseService) {}

  async submit() {
    const user = this.fb.auth.currentUser;
    await this.fb.saveAcademicProgress({
      ...this.form,
      childId: user ? user.uid : null,
      date: new Date().toISOString(),
    });
    console.log('Academic progress saved');
  }
}
