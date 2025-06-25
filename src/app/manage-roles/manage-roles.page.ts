import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';

interface UserRecord {
  id: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-manage-roles',
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
    IonSelect,
    IonSelectOption,
  ],
  templateUrl: './manage-roles.page.html',
  styleUrls: ['./manage-roles.page.scss'],
})
export class ManageRolesPage implements OnInit {
  users: UserRecord[] = [];

  constructor(private fb: FirebaseService) {}

  async ngOnInit() {
    this.users = await this.fb.getAllUsers();
  }

  async updateRole(user: UserRecord) {
    await this.fb.setUserRole(user.id, user.role);
  }
}
