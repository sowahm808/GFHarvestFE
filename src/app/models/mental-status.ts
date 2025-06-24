export interface MentalStatus {
  treatmentSchool: boolean;
  treatmentHome: boolean;
  bullied: boolean;
  notifyParent: boolean;
  suggestions: string;
  userId?: string | null;
  parentId?: string | null;
  date: string;
}
