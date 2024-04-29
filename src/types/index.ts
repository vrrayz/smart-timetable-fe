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
  room?: string;
  building?: string;
  lecturer?: string;
  repeat: boolean;
  schedule: Schedule[];
  Course: Course;
}

export interface Timetable {
  id: number;
  userId: number;
  courseId: number;
  termId: number;
  repeat: boolean;
  schedule: Schedule[];
  Course: Course;
}

export interface Exam {
  id: number;
  userId: number;
  courseId: number;
  termId: number;
  room?: string;
  building?: string;
  schedule: Schedule[];
  Course: Course;
}
export interface Task {
  id: number;
  userId: number;
  title: string;
  detail?: string;
  schedule: Schedule[];
}
export interface Schedule {
  id: number;
  userId: number;
  termId?: number;
  classId?: number;
  taskId?: number;
  examId?: number;
  days: string;
  startDate: Date;
  endDate: Date;
  startTime: number;
  endTime: number;
}
export type ScheduleInputs = {
  days: string[];
  startDate: string;
  endDate: string;
  startTime: number;
  endTime: number;
};
export type ScheduleInputsWithId = ScheduleInputs & { id: number };
export type TimeFieldsInput = {
  startTime: string;
  endTime: string;
};

export interface GeneratedTimeTableMap {
  [key: string]: TimetableItem[];
}
export interface GenerateTimetableType {
  Monday: TimetableItem[];
  Tuesday: TimetableItem[];
  Wednesday: TimetableItem[];
  Thursday: TimetableItem[];
  Friday: TimetableItem[];
  Saturday: TimetableItem[];
  Sunday: TimetableItem[];
}

export interface TimetableItem {
  id: number;
  title: string;
  courseCode: string;
  termId: number;
  userId: number;
  startTime: number;
  endTime: number;
}
