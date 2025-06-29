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
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

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
  pageTitle = 'Kids Faith Tracker';
  constructor(private router: Router, private route: ActivatedRoute, public roleSvc: RoleService, private fb: FirebaseService) {
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

    // Initialize page title based on the current active route
    let initialChild = this.route.firstChild;
    while (initialChild?.firstChild) {
      initialChild = initialChild.firstChild;
    }
    this.pageTitle = initialChild?.snapshot.data['title'] || 'Kids Faith Tracker';

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        let child = this.route.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        this.pageTitle = child?.snapshot.data['title'] || 'Kids Faith Tracker';
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
