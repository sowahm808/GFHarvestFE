import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  IonMenuButton,
} from '@ionic/angular/standalone';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { RoleService } from '../services/role.service';
import { FirebaseService } from '../services/firebase.service';
import { filter } from 'rxjs/operators';

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
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonMenuButton,
    
  ],
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  loggedIn = false;
  pageTitle = 'Kids Faith Tracker';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public roleSvc: RoleService,
    private fb: FirebaseService
  ) {
    // Monitor Firebase Auth State
    this.fb.auth.onAuthStateChanged((user) => {
      this.loggedIn = !!user;
      const url = this.router.url;
      if (!user) {
        if (!url.startsWith('/login') && !url.startsWith('/register')) {
          this.router.navigateByUrl('/login');
        }
      } else if (url === '/login' || url === '/register' || url === '/') {
        this.router.navigateByUrl('/tabs/home');
      }
    });

    // Update page title based on the deepest child route
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        let child = this.route;
        while (child.firstChild) {
          child = child.firstChild;
        }
        this.pageTitle = child.snapshot.data['title'] || 'Kids Faith Tracker';
      });
  }

  logout() {
    this.roleSvc.setRole(null);
    this.fb.logout();
    this.router.navigateByUrl('/login');
  }

  get role(): string | null {
    return this.roleSvc.role;
  }
}
