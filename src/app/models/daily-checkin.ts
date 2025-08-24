export interface DailyCheckin {
  talent: boolean;
  talentText: string;
  home: boolean;
  homeText: string;
  physical: boolean;
  physicalText: string;
  people: boolean;
  peopleText: string;
  giving: boolean;
  givingText: string;
  wish: string;
  goal: string;
  birthday: string;
  mood: string;
  sleepQuality: number | null;
  appetite: number | null;
  treatment: string;
  needsHelp: boolean;
  helpRequest: string;
  redFlags?: string[];
  childId?: string | null;
  parentId?: string | null;
  mentorId?: string | null;
  date: string;
}

