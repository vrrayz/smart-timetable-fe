export interface Term {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  courses: Course[];
}
export interface CurrentTerm {
  termId: number;
}
export interface Course {
  id: number;
  termId: number;
  userId: number;
  title: string;
  courseCode: string;
}

export interface StudyPreferenceInterface {
  id: number;
  userId: number;
  startTime: number;
  endTime: number;
  coursesPerDay: number;
  breaksPerDay: number;
}
