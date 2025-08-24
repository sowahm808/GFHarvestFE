import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
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
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  form = { email: '', password: '' };
  selectedRole = 'child';

  constructor(
    private fb: FirebaseService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async register() {
    const cred = await this.fb.register(this.form.email, this.form.password);
    await this.fb.requestRole(cred.user.uid, this.selectedRole, this.form.email);
    await this.fb.logout();
    const toast = await this.toastCtrl.create({
      message: 'Registration submitted for approval',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
    this.router.navigateByUrl('/login');
  }

  async registerWithGoogle() {
    const cred = await this.fb.loginWithGoogle();
    await this.fb.requestRole(
      cred.user.uid,
      this.selectedRole,
      cred.user.email || ''
    );
    await this.fb.logout();
    const toast = await this.toastCtrl.create({
      message: 'Registration submitted for approval',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
    this.router.navigateByUrl('/login');
  }
}
