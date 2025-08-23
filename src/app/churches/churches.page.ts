import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAvatar,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ChurchApiService } from '../services/church-api.service';
import { Church } from '../models/church';
import { RoleService } from '../services/role.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-churches',
  templateUrl: './churches.page.html',
  styleUrls: ['./churches.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonAvatar,
    FormsModule,
    NgFor,
    NgIf,
  ],
})
export class ChurchesPage {
  churches: Church[] = [];
  name = '';
  logoUrl = '';
  role: string | null = null;

  editing: Record<string, boolean> = {};
  editName: Record<string, string> = {};
  editLogoUrl: Record<string, string> = {};

  constructor(
    private api: ChurchApiService,
    private roleSvc: RoleService,
    private fb: FirebaseService
  ) {
    this.roleSvc.role$.subscribe((r) => (this.role = r));
  }

  ionViewWillEnter(): void {
    this.load();
  }

  load(): void {
    if (this.role === 'church') {
      const uid = this.fb.auth.currentUser?.uid;
      if (uid) {
        this.api.get(uid).subscribe((c) => (this.churches = c ? [c] : []));
      } else {
        this.churches = [];
      }
    } else {
      this.api.list().subscribe((cs) => (this.churches = cs));
    }
  }

  add(): void {
    if (!this.name) {
      return;
    }
    const payload: { name: string; logoUrl?: string } = { name: this.name };
    if (this.logoUrl) {
      payload.logoUrl = this.logoUrl;
    }
    this.api.create(payload).subscribe((c) => {
      this.churches.push(c);
      this.name = '';
      this.logoUrl = '';
    });
  }

  startEdit(c: Church): void {
    if (!c.id) {
      return;
    }
    this.editing[c.id] = true;
    this.editName[c.id] = c.name;
    this.editLogoUrl[c.id] = c.logoUrl || '';
  }

  cancelEdit(c: Church): void {
    if (c.id) {
      this.editing[c.id] = false;
    }
  }

  save(c: Church): void {
    if (!c.id) {
      return;
    }
    const payload: { name?: string; logoUrl?: string } = {
      name: this.editName[c.id],
    };
    if (this.editLogoUrl[c.id]) {
      payload.logoUrl = this.editLogoUrl[c.id];
    }
    this.api.update(c.id, payload).subscribe((updated) => {
      c.name = updated.name;
      c.logoUrl = updated.logoUrl;
      this.editing[c.id!] = false;
    });
  }

  remove(c: Church): void {
    if (!c.id) {
      return;
    }
    this.api.delete(c.id).subscribe(() => {
      this.churches = this.churches.filter((ch) => ch.id !== c.id);
    });
  }

  onLogoFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.logoUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onEditLogoFileChange(event: Event, c: Church): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file || !c.id) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.editLogoUrl[c.id!] = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
