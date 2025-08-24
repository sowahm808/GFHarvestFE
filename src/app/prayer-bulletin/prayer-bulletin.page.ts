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
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { PrayerRequestApiService } from '../services/prayer-request-api.service';
import { PrayerRequest } from '../models/prayer-request';
import { RoleService } from '../services/role.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-prayer-bulletin',
  templateUrl: './prayer-bulletin.page.html',
  styleUrls: ['./prayer-bulletin.page.scss'],
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
    FormsModule,
    NgFor,
    NgIf,
    DatePipe,
  ],
})
export class PrayerBulletinPage {
  requests: PrayerRequest[] = [];
  groupedRequests: { userId: string; requests: PrayerRequest[] }[] = [];
  userId = '';
  text = '';
  birthday = '';
  timeZone = '';
  gender = '';
  role: string | null = null;

  editing: Record<string, boolean> = {};
  editText: Record<string, string> = {};

  constructor(
    private api: PrayerRequestApiService,
    private roleSvc: RoleService,
    private fb: FirebaseService
  ) {
    this.roleSvc.role$.subscribe((r) => (this.role = r));
  }

  ionViewWillEnter(): void {
    this.load();
  }

  load(): void {
    this.api.list().subscribe((rs) => {
      let reqs = rs
        .map((r) => this.enrichRequest(r))
        .filter((r) => !this.isExpired(r));
      if (this.role === 'church') {
        const uid = this.fb.auth.currentUser?.uid;
        reqs = reqs.filter((r) => r.userId === uid);
      }
      this.requests = reqs;
      this.computeGroups();
    });
  }

  add(): void {
    const id = this.role === 'church' ? this.fb.auth.currentUser?.uid : this.userId;
    if (!id || !this.text) {
      return;
    }
    this.api
      .create({
        userId: id,
        text: this.text,
        birthday: this.birthday || null,
        timeZone: this.timeZone || null,
        gender: this.gender || null,
      })
      .subscribe((r) => {
        this.enrichRequest(r);
        this.requests.push(r);
        this.computeGroups();
        if (this.role !== 'church') {
          this.userId = '';
        }
        this.text = '';
        this.birthday = '';
        this.timeZone = '';
        this.gender = '';
      });
  }

  markPrayed(req: PrayerRequest): void {
    if (!req.id) {
      return;
    }
    this.api.markPrayed(req.id).subscribe((res) => {
      req.prayedAt = res.prayedAt;
      if (this.isExpired(req)) {
        this.requests = this.requests.filter((r) => r.id !== req.id);
      }
      this.computeGroups();
    });
  }

  startEdit(req: PrayerRequest): void {
    if (!req.id) {
      return;
    }
    this.editing[req.id] = true;
    this.editText[req.id] = req.text;
  }

  cancelEdit(req: PrayerRequest): void {
    if (req.id) {
      this.editing[req.id] = false;
    }
  }

  save(req: PrayerRequest): void {
    if (!req.id) {
      return;
    }
    const text = this.editText[req.id];
    this.api.update(req.id, { text }).subscribe((updated) => {
      req.text = updated.text;
      this.editing[req.id!] = false;
    });
  }

  markAllForUser(userId: string): void {
    this.requests
      .filter((r) => r.userId === userId && !r.prayedAt)
      .forEach((r) => this.markPrayed(r));
  }

  trackGroup(_: number, group: { userId: string }): string {
    return group.userId;
  }

  trackRequest(_: number, req: PrayerRequest): string | undefined {
    return req.id;
  }

  private computeGroups(): void {
    const map: Record<string, PrayerRequest[]> = {};
    for (const r of this.requests) {
      if (!map[r.userId]) {
        map[r.userId] = [];
      }
      map[r.userId].push(r);
    }
    this.groupedRequests = Object.entries(map).map(([userId, requests]) => ({
      userId,
      requests,
    }));
  }

  private enrichRequest(req: PrayerRequest): PrayerRequest {
    if (req.birthday) {
      const birth = new Date(req.birthday);
      const age = Math.floor(
        (Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
      );
      req.age = age;
      req.ageGroup = age >= 18 ? 'Adult' : 'Child';
      req.color = age >= 18 ? 'purple' : 'blue';
    } else {
      req.color = 'blue';
    }
    return req;
  }

  private isExpired(req: PrayerRequest): boolean {
    return (
      !!req.prayedAt &&
      new Date(req.prayedAt).getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000
    );
  }
}
