import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group, GroupType } from '../models/group';
import { environment } from '../../environments/environment';
import { FirebaseService } from './firebase.service';
import { Observable, from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GroupService {
  private readonly baseUrl = `${environment.apiUrl}/groups`;
  private groups: Group[] = [];

  constructor(private http: HttpClient, private fb: FirebaseService) {}

  getGroups(): Group[] {
    return this.groups;
  }

  fetchGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl);
  }

  createGroup(type: GroupType, ageGroup: string): void {
    const payload = { name: `${type}-${ageGroup}`, type, ageGroup };
    this.http.post<Group>(`${this.baseUrl}/create`, payload).subscribe((group) => {
      this.groups.push(group);
    });
  }

  addMember(groupId: string, childId: string): void {
    const payload = { groupId, childId };
    this.http.post(`${this.baseUrl}/add-member`, payload).subscribe(() => {
      const group = this.groups.find((g) => g.id === groupId);
      if (group && !group.members.includes(childId)) {
        group.members.push(childId);
      }
    });
  }
}
