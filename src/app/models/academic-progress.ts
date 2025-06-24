export interface AcademicProgressEntry {
  testScore: number | null;
  shareResult: boolean;
  needsHelp: boolean;
  userId?: string | null;
  date: string;
}
