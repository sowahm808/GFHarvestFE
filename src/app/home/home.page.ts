import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  
} from '@ionic/angular/standalone';
import { RoleService } from '../services/role.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    RouterLink,
    NgIf,
  ],
})
export class HomePage {
  constructor(public roleSvc: RoleService) {}

  get role(): string | null {
    return this.roleSvc.role;
  }
}
