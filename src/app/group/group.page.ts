import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonInput,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Group, GroupType } from '../models/group';
import { GroupService } from '../services/group.service';
import { MentorApiService } from '../services/mentor-api.service';
import { FirebaseService } from '../services/firebase.service';

interface MentorOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonInput,
  ],
})
export class GroupPage {
  groupType: GroupType = 'school';
  ageGroup = '';
  selectedMentor = '';
  mentors: MentorOption[] = [
    { id: 'mentor1', name: 'Mentor 1' },
    { id: 'mentor2', name: 'Mentor 2' },
  ];

  constructor(
    private groupSvc: GroupService,
    private mentorApi: MentorApiService,
    private fb: FirebaseService
  ) {}

  get groups(): Group[] {
    return this.groupSvc.getGroups();
  }

  createGroup() {
    if (this.ageGroup.trim()) {
      this.groupSvc.createGroup(this.groupType, this.ageGroup);
      this.ageGroup = '';
    }
  }

  joinGroup(group: Group) {
    const childId = this.fb.auth.currentUser?.uid;
    if (!childId) {
      return;
    }
    if (this.selectedMentor) {
      this.mentorApi
        .assignMentor({ mentorId: this.selectedMentor, childId })
        .subscribe();
    }
    this.groupSvc.addMember(group.id, childId);
  }
}
