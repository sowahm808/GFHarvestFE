import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonTabs,
  IonRouterOutlet,

  IonTabBar,
  IonTabButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';

import { RoleService } from '../services/role.service';
import { FirebaseService } from '../services/firebase.service';
import { BreadcrumbsComponent } from '../components/breadcrumbs.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [

    CommonModule,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonIcon,
    IonLabel,
    BreadcrumbsComponent,
  ],
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  constructor(public roleSvc: RoleService, private fb: FirebaseService) {}

  logout() {
    this.roleSvc.setRole(null);
    this.fb.logout();
  }

  get role(): string | null {
    return this.roleSvc.role;
  }
}
