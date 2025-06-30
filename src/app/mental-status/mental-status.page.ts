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
  IonTextarea,
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { MentalStatus } from '../models/mental-status';
import { ToastController } from '@ionic/angular';

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

    IonList,
    IonButton,
    IonCheckbox,
    IonTextarea,
  ],
  templateUrl: './mental-status.page.html',
  styleUrls: ['./mental-status.page.scss'],
})
export class MentalStatusPage {
  form: Omit<MentalStatus, 'childId' | 'parentId' | 'date'> = {
    treatmentSchool: false,
    treatmentHome: false,
    bullied: false,
    notifyParent: false,
    suggestions: '',
  };

  constructor(private fb: FirebaseService, private toastCtrl: ToastController) {}

  async submit() {
    const user = this.fb.auth.currentUser;
    const parentId = user ? await this.fb.getParentIdForChild(user.uid) : null;
    await this.fb.saveMentalStatus({
      ...this.form,
      childId: user ? user.uid : null,
      parentId,
      date: new Date().toISOString(),
    });
    const toast = await this.toastCtrl.create({
      message: 'Mental status saved',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}
