import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { UserStats } from '../models/user-stats';
import { AppNotification } from '../models/notification';

@Component({
  selector: 'app-reward-center',
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
  templateUrl: './reward-center.page.html',
  styleUrls: ['./reward-center.page.scss'],
})
export class RewardCenterPage implements OnInit {
  stats: UserStats | null = null;
  notifications: AppNotification[] = [];

  constructor(private fb: FirebaseService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async ionViewWillEnter() {
    await this.loadData();
  }

  private async loadData() {
    const user = this.fb.auth.currentUser;
    if (!user) {
      this.stats = null;
      this.notifications = [];
      return;
    }
    this.stats = await this.fb.getUserStats(user.uid);
    const parentId = await this.fb.getParentIdForChild(user.uid);
    if (parentId) {
      this.notifications = await this.fb.getNotifications(parentId);
    }
  }
}
