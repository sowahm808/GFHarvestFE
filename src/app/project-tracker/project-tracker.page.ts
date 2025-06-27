import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
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
  IonSelect,
  IonSelectOption,

} from '@ionic/angular/standalone';
import { IonPage } from '@ionic/angular';
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
    IonPage,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    IonButton,
    IonCheckbox,
    IonSelect,
    IonSelectOption,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './project-tracker.page.html',
  styleUrls: ['./project-tracker.page.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // 👉 this line allows <ion-page>

})
export class ProjectTrackerPage {
  form: Omit<ProjectEntry, 'childId' | 'date' | 'quarter'> = {
    title: '',
    presentationDate: '',
    needsHelp: false,
    enjoyment: 3,
    progress: 'in progress',
  };

  constructor(private fb: FirebaseService) {}

  async submit() {
    if (!this.form.title || !this.form.presentationDate || !this.form.enjoyment) {
      alert('Please fill in all required fields');
      return;
    }
    const user = this.fb.auth.currentUser;
    const quarter = this.getQuarter(this.form.presentationDate);
    await this.fb.saveProject({
      ...this.form,
      quarter,
      childId: user ? user.uid : null,
      date: new Date().toISOString(),
    });
    console.log('Project saved');
    this.form = {
      title: '',
      presentationDate: '',
      needsHelp: false,
      enjoyment: 3,
      progress: 'in progress',
    };
  }

  private getQuarter(dateStr: string): string {
    if (!dateStr) {
      return '';
    }
    const month = new Date(dateStr).getMonth();
    const q = Math.floor(month / 3) + 1;
    return `Q${q}`;
  }
}
