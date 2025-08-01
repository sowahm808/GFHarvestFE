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
  IonProgressBar,
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { UserStats } from '../models/user-stats';
import { AppNotification } from '../models/notification';
import { PointsJarComponent } from './points-jar/points-jar.component';
import { GroupBarChartComponent } from './group-bar-chart/group-bar-chart.component';
import { GroupApiService } from '../services/group-api.service';
import { PointsApiService } from '../services/points-api.service';
import { GroupPoints } from '../models/group-stats';
import { firstValueFrom } from 'rxjs';

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
    IonProgressBar,
    PointsJarComponent,
    GroupBarChartComponent,
  ],
  templateUrl: './reward-center.page.html',
  styleUrls: ['./reward-center.page.scss'],
})
export class RewardCenterPage implements OnInit {
  stats: UserStats | null = null;
  notifications: AppNotification[] = [];
  groups: GroupPoints[] = [];
  animateJar = false;
  maxGroupPoints = 1;

  constructor(
    private fb: FirebaseService,
    private groupApi: GroupApiService,
    private pointsApi: PointsApiService
  ) {}

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
      this.groups = [];
      return;
    }
    this.stats = await firstValueFrom(
      this.pointsApi.getChildPoints(user.uid)
    );
    const last = Number(localStorage.getItem('lastPoints')) || 0;
    if (this.stats && this.stats.points > last) {
      this.animateJar = true;
    }
    localStorage.setItem('lastPoints', String(this.stats?.points || 0));
    const parentId = await this.fb.getParentIdForChild(user.uid);
    if (parentId) {
      this.notifications = await this.fb.getNotifications(parentId);
    }
    this.groups = await firstValueFrom(this.groupApi.getGroupPoints());
    this.maxGroupPoints = Math.max(...this.groups.map((g) => g.points), 1);
  }
}
