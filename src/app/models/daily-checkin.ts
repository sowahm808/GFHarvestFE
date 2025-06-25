export interface DailyCheckin {
  gratitude1: string;
  gratitude2: string;
  gratitude3: string;
  wish: string;
  goal: string;
  birthday: string;
  mood: string;
  sleepQuality: string;
  appetite: string;
  treatment: string;
  needsHelp: boolean;
  helpRequest: string;
  userId?: string | null;
  parentId?: string | null;
  date: string;
}
