export interface MentorRecord {
  /** Unique document identifier */
  id?: string;
  /** Child linked to the record */
  childId?: string | null;
  /** Mentor who created the record */
  mentorId?: string | null;
  /** Mentor notes for the child */
  notes: string;
  /** Completion progress as a percentage */
  progress: number;
  /** Due date for the task */
  dueDate: string;
  /** Server timestamp for creation */
  created?: string;
}
