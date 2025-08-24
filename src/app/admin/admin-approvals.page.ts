import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { UserApiService } from '../services/user-api.service';
import { RoleRequest } from '../models/role-request';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin-approvals',
  templateUrl: './admin-approvals.page.html',
  styleUrls: ['./admin-approvals.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
  ],
})
export class AdminApprovalsPage implements OnInit {
  requests: RoleRequest[] = [];

  constructor(
    private fb: FirebaseService,
    private userApi: UserApiService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.load();
  }

  async load() {
    this.requests = await this.fb.getRoleRequests();
  }

  approve(req: RoleRequest) {
    this.userApi.assignRole(req.uid, req.role).subscribe({
      next: async () => {
        await this.fb.deleteRoleRequest(req.id!);
        this.requests = this.requests.filter((r) => r.id !== req.id);
        const toast = await this.toastCtrl.create({
          message: 'Role approved',
          duration: 1500,
          position: 'bottom',
        });
        await toast.present();
      },
      error: (err) => console.error('Approval failed', err),
    });
  }
}
