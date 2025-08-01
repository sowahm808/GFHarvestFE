import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {

  
  
  
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { EssayEntry } from '../models/essay-entry';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-essay-tracker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
  ],
  templateUrl: './essay-tracker.page.html',
  styleUrls: ['./essay-tracker.page.scss'],
})
export class EssayTrackerPage {
  form: Omit<EssayEntry, 'childId' | 'date'> = {
    title: '',
    progress: 'in progress',
    needHelp: false,
  };

  constructor(private fb: FirebaseService, private toastCtrl: ToastController) {}

  async submit() {
    const user = this.fb.auth.currentUser;
    await this.fb.saveEssay({
      ...this.form,
      childId: user ? user.uid : null,
      date: new Date().toISOString(),
    });
    const toast = await this.toastCtrl.create({
      message: 'Essay saved',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}
