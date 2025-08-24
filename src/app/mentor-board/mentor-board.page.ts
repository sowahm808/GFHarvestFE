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
import { MentorApiService } from '../services/mentor-api.service';
import { MentorProfile } from '../models/mentor-profile';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-mentor-board',
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
  templateUrl: './mentor-board.page.html',
  styleUrls: ['./mentor-board.page.scss'],
})
export class MentorBoardPage implements OnInit {
  mentors: MentorProfile[] = [];

  constructor(private mentorApi: MentorApiService) {}

  async ngOnInit() {
    await this.loadMentors();
  }

  async ionViewWillEnter() {
    await this.loadMentors();
  }

  private async loadMentors() {
    this.mentors = await firstValueFrom(this.mentorApi.getMentors());
  }
}
