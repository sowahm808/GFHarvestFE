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
import { Router, ActivatedRoute, NavigationEnd, RouterLink } from '@angular/router';
import { RoleService } from '../services/role.service';
import { FirebaseService } from '../services/firebase.service';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

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
  appTitle = 'Grounded and Fruitful';

  constructor(
    private router: Router,
    public roleSvc: RoleService,
    private fb: FirebaseService,
    private title: Title,
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
        let child: ActivatedRoute = this.router.routerState.root;
        while (child.firstChild) {
          child = child.firstChild;
        }
        const baseTitle = 'Grounded and Fruitful';
        const routeTitle = child.snapshot.data['title'];
        this.appTitle = routeTitle || baseTitle;
        this.title.setTitle(routeTitle ? `${routeTitle} | ${baseTitle}` : baseTitle);
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
