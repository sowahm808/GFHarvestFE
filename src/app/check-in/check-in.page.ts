import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonList, IonTextarea } from '@ionic/angular/standalone';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonList, IonTextarea],
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage {
  form = {
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
  };

  submit() {
    console.log('Check-in data:', this.form);
    // TODO: integrate with Firebase service
  }
}
