import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonTabs,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    IonPage,
    CommonModule,
    RouterLink,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
  ],
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  constructor(public roleSvc: RoleService) {}

  get role(): string | null {
    return this.roleSvc.role;
  }
}
