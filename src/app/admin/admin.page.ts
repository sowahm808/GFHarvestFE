import { Component, OnInit } from '@angular/core';
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
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { MentorApiService } from '../services/mentor-api.service';
import { ToastController } from '@ionic/angular';
import { MentorProfile } from '../models/mentor-profile';
import { ChildProfile } from '../models/child-profile';

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
    IonSelect,
    IonSelectOption,
  ],
})
export class AdminPage implements OnInit {
  mentor = { name: '', email: '', phone: '' };
  mentors: MentorProfile[] = [];
  children: ChildProfile[] = [];
  selectedMentorId = '';
  selectedChildId = '';

  constructor(
    private mentorApi: MentorApiService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.mentorApi.getMentors().subscribe((m) => (this.mentors = m));
    this.mentorApi
      .getChildProfiles()
      .subscribe((c) => (this.children = c));
  }

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
    if (!this.selectedMentorId || !this.selectedChildId) {
      return;
    }
    this.mentorApi
      .assignMentor({
        mentorId: this.selectedMentorId,
        childId: this.selectedChildId,
      })
      .subscribe(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Mentor assigned',
          duration: 1500,
          position: 'bottom',
        });
        await toast.present();
        this.selectedMentorId = '';
        this.selectedChildId = '';
      });
  }
}

