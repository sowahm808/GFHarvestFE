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
  IonList,
  IonButton,
  IonSelect,
  IonSelectOption,
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
    IonSelect,
    IonSelectOption,
    IonTextarea,
  ],
  templateUrl: './mental-status.page.html',
  styleUrls: ['./mental-status.page.scss'],
})
export class MentalStatusPage {
  form: Omit<MentalStatus, 'childId' | 'parentId' | 'mentorId' | 'date'> = {
    treatmentHome: '',
    treatmentSchool: '',
    teachersLectures: '',
    teachersRecess: '',
    teachersFreeTime: '',
    teachersLunchTime: '',
    bulliedSchool: false,
    bulliedNeighborhood: false,
    bulliedHome: false,
    discussedWithParents: false,
    loveLife: true,
    hurtOthers: false,
    hurtSelf: false,
    planHurtSelf: false,
    sleep: '',
    appetite: '',
    suggestions: '',
    redFlag: false,
  };

  constructor(private fb: FirebaseService, private toastCtrl: ToastController) {}

  async submit() {
    const user = this.fb.auth.currentUser;
    const parentId = user ? await this.fb.getParentIdForChild(user.uid) : null;
    const mentorId = user ? await this.fb.getMentorIdForChild(user.uid) : null;
    const bulliedAny =
      this.form.bulliedSchool ||
      this.form.bulliedNeighborhood ||
      this.form.bulliedHome;
    this.form.redFlag =
      this.form.treatmentHome === 'yuck' ||
      this.form.treatmentSchool === 'yuck' ||
      this.form.teachersLectures === 'yuck' ||
      this.form.teachersRecess === 'yuck' ||
      this.form.teachersFreeTime === 'yuck' ||
      this.form.teachersLunchTime === 'yuck' ||
      (bulliedAny && !this.form.discussedWithParents) ||
      !this.form.loveLife ||
      this.form.hurtOthers ||
      this.form.hurtSelf ||
      this.form.planHurtSelf ||
      ['overeat', 'no_appetite', 'prefer_away', 'throw_up'].includes(
        this.form.appetite
      );
    await this.fb.saveMentalStatus({
      ...this.form,
      childId: user ? user.uid : null,
      parentId,
      mentorId,
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
