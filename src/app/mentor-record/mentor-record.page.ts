import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  
  
  
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { MentorRecordApiService } from '../services/mentor-record-api.service';
import { FirebaseService } from '../services/firebase.service';
import { MentorRecord } from '../models/mentor-record';

@Component({
  selector: 'app-mentor-record',
  standalone: true,
  imports: [
    CommonModule,
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
    const childId = this.fb.auth.currentUser?.uid;
    if (!childId) {
      this.records = [];
      return;
    }
    this.api.getRecords(childId).subscribe((recs) => (this.records = recs));
  }
}
