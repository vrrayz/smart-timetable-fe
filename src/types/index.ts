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

export interface Classes {
  id: number;
  userId: number;
  courseId: number;
  termId: number;
  room: string | null;
  building: string | null;
  lecturer: string | null;
  repeat: boolean;
  schedule: Schedule[];
}

export interface Schedule {
  id: number;
  userId: number;
  termId: number | null;
  classId: number | null;
  days: string;
  startDate: Date;
  endDate: Date;
  startTime: number;
  endTime: number;
}
export type TimeFieldsInput = {
  startTime: string;
  endTime: string;
};