import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonList, IonTextarea, IonSegment, IonSegmentButton, IonCheckbox, IonToggle } from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { ToastController } from '@ionic/angular';
import { DailyCheckin } from '../models/daily-checkin';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonList,
    IonTextarea,
    IonSegment,
    IonSegmentButton,
    IonCheckbox,
    IonToggle,
  ],
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage {
  form: Omit<
    DailyCheckin,
    'childId' | 'parentId' | 'mentorId' | 'date' | 'redFlags'
  > = {
    talent: false,
    talentText: '',
    home: false,
    homeText: '',
    physical: false,
    physicalText: '',
    people: false,
    peopleText: '',
    giving: false,
    givingText: '',
    wish: '',
    goal: '',
    birthday: '',
    mood: '',
    sleepQuality: null,
    appetite: null,
    treatment: '',
    needsHelp: false,
    helpRequest: '',
  };

  constructor(private fbService: FirebaseService, private toastCtrl: ToastController) {}

  async submit() {
    const user = this.fbService.auth.currentUser;
    const parentId = user
      ? await this.fbService.getParentIdForChild(user.uid)
      : null;
    const mentorId = user
      ? await this.fbService.getMentorIdForChild(user.uid)
      : null;
    const redFlags: string[] = [];
    if (!this.form.talent) {
      redFlags.push('talent');
    }
    if (!this.form.home) {
      redFlags.push('home');
    }
    if (!this.form.physical) {
      redFlags.push('physical');
    }
    if (!this.form.people) {
      redFlags.push('people');
    }
    if (!this.form.giving) {
      redFlags.push('giving');
    }
    await this.fbService.saveDailyCheckin({
      ...this.form,
      redFlags,
      childId: user ? user.uid : null,
      parentId,
      mentorId,
      date: new Date().toISOString(),
    });
    if (redFlags.length) {
      const message = `Child lacked gratitude for: ${redFlags.join(', ')}`;
      if (parentId) {
        await this.fbService.sendNotification(parentId, message);
      }
      if (mentorId) {
        await this.fbService.sendMentorNotification(mentorId, message);
      }
    }
    const toast = await this.toastCtrl.create({
      message: 'Check-in saved',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}
