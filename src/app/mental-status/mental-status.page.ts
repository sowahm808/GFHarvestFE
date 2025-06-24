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
  IonTextarea,
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-mental-status',
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
    IonTextarea,
  ],
  templateUrl: './mental-status.page.html',
  styleUrls: ['./mental-status.page.scss'],
})
export class MentalStatusPage {
  form = {
    treatmentSchool: false,
    treatmentHome: false,
    bullied: false,
    notifyParent: false,
    suggestions: '',
  };

  constructor(private fb: FirebaseService) {}

  async submit() {
    const user = this.fb.auth.currentUser;
    await this.fb.saveMentalStatus({
      ...this.form,
      userId: user ? user.uid : null,
      date: new Date().toISOString(),
    });
    console.log('Mental status saved');
  }
}
