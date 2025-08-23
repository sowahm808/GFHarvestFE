export interface PrayerRequest {
  id?: string;
  userId: string;
  text: string;
  birthday?: string | null;
  timeZone?: string | null;
  gender?: string | null;
  age?: number;
  ageGroup?: string;
  color?: string;
  createdAt?: string;
  prayedAt?: string | null;
}
