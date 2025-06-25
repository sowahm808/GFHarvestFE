import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonList } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { RoleService } from '../services/role.service';

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
    RouterLink,
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form = { email: '', password: '' };

  constructor(
    private fb: FirebaseService,
    private router: Router,
    private roleSvc: RoleService
  ) {}

  async login() {
    const cred = await this.fb.login(this.form.email, this.form.password);
    const role = await this.fb.getUserRole(cred.user.uid);
    this.roleSvc.setRole(role);
    this.router.navigateByUrl('/tabs');
  }
}
