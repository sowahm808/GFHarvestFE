import { Component } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { RoleService } from './services/role.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonRouterOutlet,
    // IonHeader,
    // IonToolbar,
    // IonButtons,
    // IonButton,
    // IonIcon,
    // IonTitle,
    // NgIf
  ],
})
export class AppComponent {
  loggedIn = false;

  constructor(private router: Router, private fb: FirebaseService, private roleSvc: RoleService) {
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
}
