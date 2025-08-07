export type GroupType =
  | 'school'
  | 'neighbourhood'
  | 'family'
  | 'church'
  | 'random';

export interface Group {
  id: string;
  name: string;
  type: GroupType;
  ageGroup: string;
  members: string[];
  mentorId?: string;
}
