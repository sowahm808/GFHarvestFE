import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NgFor, DatePipe } from '@angular/common';
import { PrayerRequestApiService } from '../services/prayer-request-api.service';
import { PrayerRequest } from '../models/prayer-request';

@Component({
  selector: 'app-prayer-bulletin',
  templateUrl: './prayer-bulletin.page.html',
  styleUrls: ['./prayer-bulletin.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    FormsModule,
    NgFor,
    DatePipe,
  ],
})
export class PrayerBulletinPage {
  requests: PrayerRequest[] = [];
  userId = '';
  text = '';

  constructor(private api: PrayerRequestApiService) {}

  ionViewWillEnter(): void {
    this.load();
  }

  load(): void {
    this.api.list().subscribe((rs) => (this.requests = rs));
  }

  add(): void {
    if (!this.userId || !this.text) {
      return;
    }
    this.api.create({ userId: this.userId, text: this.text }).subscribe((r) => {
      this.requests.push(r);
      this.userId = '';
      this.text = '';
    });
  }

  markPrayed(req: PrayerRequest): void {
    if (!req.id) {
      return;
    }
    this.api.markPrayed(req.id).subscribe((res) => {
      req.prayedAt = res.prayedAt;
    });
  }
}
