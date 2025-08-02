import { Injectable } from '@angular/core';
import { Group, GroupType } from '../models/group';

@Injectable({ providedIn: 'root' })
export class GroupService {
  private groups: Group[] = [];

  getGroups(): Group[] {
    return this.groups;
  }

  createGroup(type: GroupType, ageGroup: string): Group {
    const group: Group = {
      id: crypto.randomUUID(),
      type,
      ageGroup,
      members: [],
    };
    this.groups.push(group);
    return group;
  }

  addMember(groupId: string, childId: string): boolean {
    const group = this.groups.find((g) => g.id === groupId);
    if (!group) {
      return false;
    }
    if (group.members.length >= 5) {
      return false;
    }
    if (!group.members.includes(childId)) {
      group.members.push(childId);
    }
    return true;
  }
}
