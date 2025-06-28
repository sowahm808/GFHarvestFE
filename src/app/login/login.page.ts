import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonInput, IonItem, IonLabel, IonButton, IonList, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { RoleService } from '../services/role.service';
import { BreadcrumbsComponent } from '../components/breadcrumbs.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
   
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonList,
    IonSelect,
    IonSelectOption,
    RouterLink,
    BreadcrumbsComponent,
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
    private roleSvc: RoleService
  ) {}

  async login() {
    await this.fb.login(this.form.email, this.form.password);
    this.roleSvc.setRole(this.selectedRole);
    this.router.navigateByUrl('/tabs');
  }

  async loginWithGoogle() {
    await this.fb.loginWithGoogle();
    this.roleSvc.setRole(this.selectedRole);
    this.router.navigateByUrl('/tabs');
  }
}
