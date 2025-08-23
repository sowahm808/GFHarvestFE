export interface PrayerRequest {
  id?: string;
  userId: string;
  text: string;
  createdAt?: string;
  prayedAt?: string | null;
}
