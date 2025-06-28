import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonInput, IonItem, IonLabel, IonButton, IonList, IonTextarea, IonSegment, IonSegmentButton, IonCheckbox } from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { DailyCheckin } from '../models/daily-checkin';
import { BreadcrumbsComponent } from '../components/breadcrumbs.component';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
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
    BreadcrumbsComponent,
  ],
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage {
  form: Omit<DailyCheckin, 'childId' | 'parentId' | 'date'> = {
    gratitude1: '',
    gratitude2: '',
    gratitude3: '',
    wish: '',
    goal: '',
    birthday: '',
    mood: '',
    sleepQuality: '',
    appetite: '',
    treatment: '',
    needsHelp: false,
    helpRequest: '',
  };

  constructor(private fbService: FirebaseService) {}

  async submit() {
    const user = this.fbService.auth.currentUser;
    const parentId = user ? await this.fbService.getParentIdForChild(user.uid) : null;
    await this.fbService.saveDailyCheckin({
      ...this.form,
      childId: user ? user.uid : null,
      parentId,
      date: new Date().toISOString(),
    });
    console.log('Check-in saved');
  }
}
