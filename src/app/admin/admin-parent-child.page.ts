import { Component, OnInit } from '@angular/core';
import { ParentChildService } from '../services/parent-child.service';
import { FirebaseService } from '../services/firebase.service';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-parent-child-admin',
  templateUrl: './admin-parent-child.page.html',
  styleUrls: ['./admin-parent-child.page.scss'],
  standalone: true,
  imports:[IonToolbar, 
    IonTitle,
    IonHeader,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    IonButton,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
   ]
})
export class AdminParentChildPage implements OnInit {
  parentId = '';
  childId = '';
  linkedChildren: string[] = [];

  constructor(
    private parentChildService: ParentChildService,
    private fb: FirebaseService
  ) {}

  ngOnInit(): void {}

  link() {
    if (!this.parentId || !this.childId) return;
    this.parentChildService.linkParentChild(this.parentId, this.childId).subscribe(() => {
      this.loadLinks();
    });
  }

  unlink(childId: string) {
    this.parentChildService.unlinkParentChild(this.parentId, childId).subscribe(() => {
      this.loadLinks();
    });
  }

  loadLinks() {
    if (!this.parentId) return;
    this.parentChildService.getChildrenForParent(this.parentId).subscribe((data) => {
      this.linkedChildren = data.children;
    });
  }
}
