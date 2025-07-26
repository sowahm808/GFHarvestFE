export interface MentorRecord {
  title: string;
  outline: string;
  progress: number;
  dueDate: string;
  encouragement?: string;
  childId?: string | null;
  mentorId?: string | null;
  updatedAt: string;
}
