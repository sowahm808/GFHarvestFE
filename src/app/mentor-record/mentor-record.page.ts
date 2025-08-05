import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { MentorRecordApiService } from '../services/mentor-record-api.service';
import { FirebaseService } from '../services/firebase.service';
import { MentorRecord } from '../models/mentor-record';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-mentor-record',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
  ],
  templateUrl: './mentor-record.page.html',
  styleUrls: ['./mentor-record.page.scss'],
})
export class MentorRecordPage implements OnInit {
  records: MentorRecord[] = [];

  constructor(
    private api: MentorRecordApiService,
    private fb: FirebaseService
  ) {}

  async ngOnInit() {
    await this.loadRecords();
  }

  async ionViewWillEnter() {
    await this.loadRecords();
  }

  getTimeRemaining(date: string): string {
    const diff = new Date(date).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} day(s)` : 'Past due';
  }

  private async loadRecords() {
    let childId = this.fb.auth.currentUser?.uid;
    // The auth state can be null on page load. Wait for it to resolve
    // before attempting to fetch mentor records so the list renders
    // correctly when navigating directly to this page.
    if (!childId) {
      const user = await new Promise<User | null>((resolve) => {
        const unsub = this.fb.auth.onAuthStateChanged((u) => {
          unsub();
          resolve(u);
        });
      });
      childId = user?.uid ?? undefined;
    }

    if (!childId) {
      this.records = [];
      return;
    }

    this.api.getRecords(childId).subscribe((recs) => (this.records = recs));
  }
}
