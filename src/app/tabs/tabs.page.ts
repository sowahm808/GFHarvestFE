import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonButton,
  IonIcon,
  IonLabel,
  IonButtons,
  IonTitle,
  IonToolbar,
  IonHeader,
} from '@ionic/angular/standalone';

import { RoleService } from '../services/role.service';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [

    CommonModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonButton,
    IonIcon,
    IonLabel,
    NgIf,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader
  ],
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
    loggedIn = false;

  constructor(private router: Router,public roleSvc: RoleService, private fb: FirebaseService) {
       this.fb.auth.onAuthStateChanged((user) => {
      this.loggedIn = !!user;
      const url = this.router.url;
      if (!user) {
        if (!url.startsWith('/login') && !url.startsWith('/register')) {
          this.router.navigateByUrl('/login');
        }
      } else if (url === '/login' || url === '/register' || url === '/') {
        this.router.navigateByUrl('/tabs');
      }
    });
  }

  logout() {
    this.roleSvc.setRole(null);
    this.fb.logout();
  }

  get role(): string | null {
    return this.roleSvc.role;
  }
}
