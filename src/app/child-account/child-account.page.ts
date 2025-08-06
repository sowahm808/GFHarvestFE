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
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ErrorService } from '../services/error.service';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-child-account',
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
  ],
  templateUrl: './child-account.page.html',
  styleUrls: ['./child-account.page.scss'],
})
export class ChildAccountPage {
  form = { name: '', email: '', password: '', age: null as number | null };

  constructor(
    private fb: FirebaseService,
    private router: Router,
    private toastCtrl: ToastController,
    private errorSvc: ErrorService
  ) {}

  async create() {
    const user = this.fb.auth.currentUser;
    if (!user) {
      return;
    }

    const { name, email, password, age } = this.form;
    if (!name || !email || !password || age === null) {
      const toast = await this.toastCtrl.create({
        message: 'All fields are required',
        duration: 1500,
        position: 'bottom',
      });
      await toast.present();
      return;
    }

    try {
      await this.fb.createChildAccount(email, password, user.uid, name, age);
      const toast = await this.toastCtrl.create({
        message: 'Child account created',
        duration: 1500,
        position: 'bottom',
      });
      await toast.present();
      this.router.navigateByUrl('/tabs/home');
    } catch (err) {
      if (err instanceof FirebaseError && err.code === 'auth/email-already-in-use') {
        await this.errorSvc.presentError('The Child you are trying to add already exist');
      } else {
        const msg = err instanceof Error ? err.message : 'Unable to create child account';
        await this.errorSvc.presentError(msg);
      }
    }
  }
}
