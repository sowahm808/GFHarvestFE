import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonList } from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-child-account',
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonList],
  templateUrl: './child-account.page.html',
  styleUrls: ['./child-account.page.scss'],
})
export class ChildAccountPage {
  form = { email: '', password: '' };

  constructor(private fb: FirebaseService, private router: Router) {}

  async create() {
    const user = this.fb.auth.currentUser;
    if (!user) {
      return;
    }
    await this.fb.createChildAccount(this.form.email, this.form.password, user.uid);
    this.router.navigateByUrl('/home');
  }
}
