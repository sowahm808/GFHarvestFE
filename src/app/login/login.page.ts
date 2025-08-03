import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonList, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { RoleService } from '../services/role.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
   
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonList,
    IonSelect,
    IonSelectOption,
    RouterLink,
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form = { email: '', password: '' };
  // Default to 'child' so that quiz and other child-specific features work
  // correctly even if the role selector is not changed.
  selectedRole = 'child';

  constructor(
    private fb: FirebaseService,
    private router: Router,
    private roleSvc: RoleService,
    private toastCtrl: ToastController
  ) {}

  async login() {
    try {
      await this.fb.login(this.form.email, this.form.password);
      const user = this.fb.auth.currentUser;
      const isChild = user
        ? await this.fb.isChildAccount(user.uid)
        : false;
      if (isChild && this.selectedRole !== 'child') {
        const errToast = await this.toastCtrl.create({
          message: 'Child accounts can only use the child role',
          duration: 1500,
          position: 'bottom',
          color: 'danger',
        });
        await errToast.present();
        await this.fb.logout();
        return;
      }
      const role = isChild ? 'child' : this.selectedRole;
      this.roleSvc.setRole(role);
      const toast = await this.toastCtrl.create({
        message: 'Logged in',
        duration: 1500,
        position: 'bottom',
      });
      await toast.present();
      this.router.navigateByUrl('/tabs');
    } catch (err: any) {
      const toast = await this.toastCtrl.create({
        message: err?.message || 'Login failed',
        duration: 1500,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
    }
  }

  async loginWithGoogle() {
    try {
      await this.fb.loginWithGoogle();
      const user = this.fb.auth.currentUser;
      const isChild = user
        ? await this.fb.isChildAccount(user.uid)
        : false;
      if (isChild && this.selectedRole !== 'child') {
        const errToast = await this.toastCtrl.create({
          message: 'Child accounts can only use the child role',
          duration: 1500,
          position: 'bottom',
          color: 'danger',
        });
        await errToast.present();
        await this.fb.logout();
        return;
      }
      const role = isChild ? 'child' : this.selectedRole;
      this.roleSvc.setRole(role);
      const toast = await this.toastCtrl.create({
        message: 'Logged in with Google',
        duration: 1500,
        position: 'bottom',
      });
      await toast.present();
      this.router.navigateByUrl('/tabs');
    } catch (err: any) {
      const toast = await this.toastCtrl.create({
        message: err?.message || 'Google login failed',
        duration: 1500,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
    }
  }
}
