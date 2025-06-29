import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonList } from '@ionic/angular/standalone';
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
    RouterLink,
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  form = { email: '', password: '' };

  constructor(
    private fb: FirebaseService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async register() {
    await this.fb.register(this.form.email, this.form.password);
    const toast = await this.toastCtrl.create({
      message: 'Registration successful',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
    this.router.navigateByUrl('/login');
  }

  async registerWithGoogle() {
    await this.fb.loginWithGoogle();
    const toast = await this.toastCtrl.create({
      message: 'Registered with Google',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
    this.router.navigateByUrl('/login');
  }
}
