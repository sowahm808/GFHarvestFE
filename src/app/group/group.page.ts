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
export class GroupPage implements OnInit {
  groupType: GroupType = 'school';
  ageGroup = '';
  selectedMentor = '';
  groups: Group[] = [];
  mentors: MentorOption[] = [];

  constructor(
    private groupSvc: GroupService,
    private mentorApi: MentorApiService,
    private fb: FirebaseService
  ) {}

  ngOnInit() {
    this.loadGroups();
    this.loadMentors();
  }

  loadGroups() {
    this.groupSvc.fetchGroups().subscribe({
      next: (groups) => (this.groups = groups),
      error: (err) => console.error('Failed to fetch groups', err),
    });
  }

  loadMentors() {
  this.mentorApi.getMentors().subscribe({
    next: (mentors) =>
      (this.mentors = mentors
        .filter((m) => !!m.id && !!m.name) // remove if id is undefined
        .map((m) => ({ id: m.id as string, name: m.name }))),
    error: (err) => console.error('Failed to fetch mentors', err),
  });
}


  createGroup() {
    if (!this.ageGroup.trim()) return;

    this.groupSvc.createGroup(this.groupType, this.ageGroup);
    this.ageGroup = '';

    // Optional: re-fetch list after creating
    setTimeout(() => this.loadGroups(), 1000);
  }

  joinGroup(group: Group) {
    const childId = this.fb.auth.currentUser?.uid;
    if (!childId) return;

    if (this.selectedMentor) {
      this.mentorApi
        .assignMentor({ mentorId: this.selectedMentor, childId })
        .subscribe({
          error: (err) => console.error('Mentor assignment failed', err),
        });
    }

    this.groupSvc.addMember(group.id, childId);
  }
}
