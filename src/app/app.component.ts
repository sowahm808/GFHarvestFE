import { Component } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
  IonTitle,
  IonIcon,
  IonLabel,
  
} from '@ionic/angular/standalone';
import { Router, RouterLink, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { RoleService } from './services/role.service';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonRouterOutlet,
    IonHeader,
    IonToolbar,
    IonMenu,
    IonContent,
    IonList,
    IonItem,
    IonMenuToggle,
    IonTitle,
    IonIcon,
    IonLabel,
    RouterLink,
    NgIf
  ],
})
export class AppComponent {
  loggedIn = false;

  constructor(
    private router: Router,
    private fb: FirebaseService,
    private roleSvc: RoleService,
    private title: Title,
    private route: ActivatedRoute
  ) {
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

    const appTitle = 'Grounded and Fruitful';
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        let child = this.route.firstChild;
        while (child && child.firstChild) {
          child = child.firstChild;
        }
        const routeTitle = child?.snapshot.data['title'];
        this.title.setTitle(routeTitle ? `${routeTitle} | ${appTitle}` : appTitle);
      });
  }

  get role(): string | null {
    return this.roleSvc.role;
  }

  logout() {
    this.roleSvc.setRole(null);
    this.fb.logout();
  }
}
