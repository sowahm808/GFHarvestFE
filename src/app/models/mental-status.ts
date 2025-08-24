export interface MentalStatus {
  treatmentHome: string;
  treatmentSchool: string;
  teachersLectures: string;
  teachersRecess: string;
  teachersFreeTime: string;
  teachersLunchTime: string;
  bulliedSchool: boolean;
  bulliedNeighborhood: boolean;
  bulliedHome: boolean;
  discussedWithParents: boolean;
  loveLife: boolean;
  hurtOthers: boolean;
  hurtSelf: boolean;
  planHurtSelf: boolean;
  sleep: string;
  appetite: string;
  suggestions: string;
  redFlag: boolean;
  childId?: string | null;
  parentId?: string | null;
  mentorId?: string | null;
  date: string;
}
