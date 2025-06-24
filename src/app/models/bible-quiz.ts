export interface BibleQuestion {
  id?: string;
  text: string;
}

export interface BibleQuizResult {
  question: BibleQuestion;
  answer: string;
  score: number;
  userId?: string | null;
  date: string;
}
