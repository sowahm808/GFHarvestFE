export type GroupType =
  | 'school'
  | 'neighbourhood'
  | 'family'
  | 'church'
  | 'random';

export interface Group {
  id: string;
  type: GroupType;
  ageGroup: string;
  members: string[];
  mentorId?: string;
}
