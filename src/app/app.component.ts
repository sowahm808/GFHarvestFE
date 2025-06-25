import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { RoleService } from './services/role.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private router: Router,
    private fb: FirebaseService,
    private roleSvc: RoleService
  ) {
    this.fb.auth.onAuthStateChanged(async (user) => {
      const url = this.router.url;
      if (!user) {
        if (!url.startsWith('/login') && !url.startsWith('/register')) {
          this.router.navigateByUrl('/login');
        }
        this.roleSvc.setRole(null);
      } else {
        const role = await this.fb.getUserRole(user.uid);
        this.roleSvc.setRole(role);
        if (url === '/login' || url === '/register' || url === '/') {
          this.router.navigateByUrl('/tabs');
        }
      }
    });
  }
}
