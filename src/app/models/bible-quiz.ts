export interface BibleQuestion {
  id?: string;
  text: string;
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
  userId?: string | null;
  date: string;
}
