export interface MentorProfile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  /** Church the mentor is affiliated with */
  church?: string;
  /** Years since the mentor came to Christ */
  yearsInChrist?: number;
  /** Years the mentor has served at their current church */
  yearsServed?: number;
  /** Education background of the mentor */
  education?: string;
  /** Number of children currently mentored */
  childCount?: number;
  /** Percentage of mentees showing improvement last quarter */
  improvementLastQuarter?: number;
  /** Percentage of mentees showing improvement in the last year */
  improvementLastYear?: number;
  /** Average percentage of mentees winning certificates each quarter */
  certificateRate?: number;
}
