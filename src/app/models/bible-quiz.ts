export interface BibleQuestion {
  id?: string;
  /**
   * Some questions use the `text` field while others
   * were stored under the `question` key. Both are
   * optional so the UI can fall back accordingly.
   */
  text?: string;
  question?: string;
  options?: string[];
  answer?: string;
  reference?: string;
  month?: string;
  quarter?: string;
}

export interface BibleQuizResult {
  question: BibleQuestion;
  answer: string;
  score: number;
  childId?: string | null;
  date: string;
}
