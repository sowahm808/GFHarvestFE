import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IonBreadcrumb, IonBreadcrumbs } from '@ionic/angular/standalone';
import { NgFor } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  template: `
    <ion-breadcrumbs>
      <ion-breadcrumb *ngFor="let bc of breadcrumbs" [routerLink]="bc.url">
        {{ bc.label }}
      </ion-breadcrumb>
    </ion-breadcrumbs>
  `,
  standalone: true,
  imports: [IonBreadcrumbs, IonBreadcrumb, NgFor],
})
export class BreadcrumbsComponent {
  breadcrumbs: { label: string; url: string }[] = [];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.build());
    this.build();
  }

  private build() {
    const segments = this.router.url.split('/').filter((s) => s);
    let url = '';
    this.breadcrumbs = [];
    segments.forEach((seg, idx) => {
      if (seg === 'home' && segments[idx - 1] === 'tabs') {
        return;
      }
      url += '/' + seg;
      const label = seg === 'tabs' ? 'Home' : this.format(seg);
      this.breadcrumbs.push({ label, url });
    });
  }

  private format(seg: string) {
    return seg
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ');
  }
}
