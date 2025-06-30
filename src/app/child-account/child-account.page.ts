import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonList } from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
  form = { email: '', password: '', age: null as number | null };

  constructor(
    private fb: FirebaseService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async create() {
    const user = this.fb.auth.currentUser;
    if (!user) {
      return;
    }
    if (this.form.age === null) {
      return;
    }
    await this.fb.createChildAccount(
      this.form.email,
      this.form.password,
      user.uid,
      this.form.age
    );
    const toast = await this.toastCtrl.create({
      message: 'Child account created',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
    this.router.navigateByUrl('/tabs/home');
  }
}
