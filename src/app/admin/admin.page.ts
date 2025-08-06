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
  IonButton,
  IonList,
} from '@ionic/angular/standalone';
import { MentorApiService } from '../services/mentor-api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
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
    IonButton,
    IonList,
  ],
})
export class AdminPage {
  mentorId = '';
  childId = '';
  mentor = { name: '', email: '', phone: '' };

  constructor(
    private mentorApi: MentorApiService,
    private toastCtrl: ToastController
  ) {}

  createMentor() {
    const { name, email, phone } = this.mentor;
    if (!name || !email || !phone) {
      return;
    }
    this.mentorApi
      .createMentor({ name, email, phone })
      .subscribe(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Mentor created',
          duration: 1500,
          position: 'bottom',
        });
        await toast.present();
        this.mentor = { name: '', email: '', phone: '' };
      });
  }

  assign() {
    if (!this.mentorId || !this.childId) {
      return;
    }
    this.mentorApi
      .assignMentor({ mentorId: this.mentorId, childId: this.childId })
      .subscribe(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Mentor assigned',
          duration: 1500,
          position: 'bottom',
        });
        await toast.present();
        this.mentorId = '';
        this.childId = '';
      });
  }
}

