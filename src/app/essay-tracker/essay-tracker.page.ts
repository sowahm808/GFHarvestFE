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
  IonSelect,
  IonSelectOption,
  IonPage,
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { EssayEntry } from '../models/essay-entry';

@Component({
  selector: 'app-essay-tracker',
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
    IonSelect,
    IonSelectOption,
  ],
  templateUrl: './essay-tracker.page.html',
  styleUrls: ['./essay-tracker.page.scss'],
})
export class EssayTrackerPage {
  form: Omit<EssayEntry, 'userId' | 'date'> = {
    title: '',
    progress: 'in progress',
    needHelp: false,
  };

  constructor(private fb: FirebaseService) {}

  async submit() {
    const user = this.fb.auth.currentUser;
    await this.fb.saveEssay({
      ...this.form,
      userId: user ? user.uid : null,
      date: new Date().toISOString(),
    });
    console.log('Essay saved');
  }
}
