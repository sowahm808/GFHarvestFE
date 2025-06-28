import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonInput, IonItem, IonLabel, IonButton, IonList } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from '../components/breadcrumbs.component';

@Component({
  selector: 'app-register',
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
    RouterLink,
    BreadcrumbsComponent,
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  form = { email: '', password: '' };

  constructor(private fb: FirebaseService, private router: Router) {}

  async register() {
    await this.fb.register(this.form.email, this.form.password);
    this.router.navigateByUrl('/login');
  }

  async registerWithGoogle() {
    await this.fb.loginWithGoogle();
    this.router.navigateByUrl('/login');
  }
}
