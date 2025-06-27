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
import { IonPage } from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { LeaderboardEntry } from '../models/user-stats';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [
    
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
  ],
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  leaders: LeaderboardEntry[] = [];

  constructor(private fb: FirebaseService) {}

  async ngOnInit() {
    this.leaders = await this.fb.getLeaderboard();
  }
}
