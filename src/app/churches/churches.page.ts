import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonAvatar } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ChurchApiService } from '../services/church-api.service';
import { Church } from '../models/church';

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
  ],
})
export class ChurchesPage {
  churches: Church[] = [];
  name = '';
  logoUrl = '';

  constructor(private api: ChurchApiService) {}

  ionViewWillEnter(): void {
    this.load();
  }

  load(): void {
    this.api.list().subscribe((cs) => (this.churches = cs));
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
}
