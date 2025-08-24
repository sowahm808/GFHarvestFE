export interface AcademicProgressEntry {
  testScore: number | null;
  shareResult: boolean;
  needsHelp: boolean;
  favoriteSubject: string;
  strugglingSubject: string;
  completedWeeklyAssignment: boolean;
  participatingChallenges: boolean;
  challengesToSubmit: number | null;
  childId?: string | null;
  date: string;
}
