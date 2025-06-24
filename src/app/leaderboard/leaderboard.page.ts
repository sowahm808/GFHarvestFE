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

@Component({
  selector: 'app-leaderboard',
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
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  leaders: any[] = [];

  constructor(private fb: FirebaseService) {}

  async ngOnInit() {
    this.leaders = await this.fb.getLeaderboard();
  }
}
