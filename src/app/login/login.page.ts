import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonList, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
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
    IonSelect,
    IonSelectOption,
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form = { email: '', password: '' };
  selectedRole = 'parent';

  constructor(
    private fb: FirebaseService,
    private router: Router,
    private roleSvc: RoleService
  ) {}

  async login() {
    await this.fb.login(this.form.email, this.form.password);
    this.roleSvc.setRole(this.selectedRole);
    this.router.navigateByUrl('/tabs');
  }
}
