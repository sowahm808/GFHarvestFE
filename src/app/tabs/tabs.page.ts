import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonTabs,
 
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RoleService } from '../services/role.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
   
    CommonModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
  ],
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  constructor(public roleSvc: RoleService, private fb: FirebaseService) {}

  logout() {
    this.fb.logout();
  }

  get role(): string | null {
    return this.roleSvc.role;
  }
}
