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
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { ProjectEntry } from '../models/project-entry';

@Component({
  selector: 'app-project-tracker',
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
  ],
  templateUrl: './project-tracker.page.html',
  styleUrls: ['./project-tracker.page.scss'],
})
export class ProjectTrackerPage {
  form: Omit<ProjectEntry, 'userId' | 'date'> = {
    title: '',
    presentationDate: '',
    needsHelp: false,
    enjoyment: 3,
  };

  constructor(private fb: FirebaseService) {}

  async submit() {
    const user = this.fb.auth.currentUser;
    await this.fb.saveProject({
      ...this.form,
      userId: user ? user.uid : null,
      date: new Date().toISOString(),
    });
    console.log('Project saved');
  }
}
