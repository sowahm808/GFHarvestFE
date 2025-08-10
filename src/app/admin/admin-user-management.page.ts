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
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { UserApiService } from '../services/user-api.service';
import { User } from '../models/user';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.page.html',
  styleUrls: ['./admin-user-management.page.scss'],
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
    IonButton,
  ],
})
export class AdminUserManagementPage implements OnInit {
  users: User[] = [];
  roles = ['mentor', 'child', 'parent', 'admin'];

  constructor(private userApi: UserApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userApi.getUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => console.error('Failed to load users', err),
    });
          console.log("Users",this.users)

  }

    trackByUid = (_: number, u: User) => u.uid;


  updateRole(user: User) {
    if (!user.uid || !user.role) return;
    this.userApi.assignRole(user.uid, user.role).subscribe({
      next: () => console.log('Role updated'),
      error: (err) => console.error('Failed to assign role', err),
    });
  }
}
