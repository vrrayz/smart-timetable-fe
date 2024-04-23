export interface Term {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  courses: Course[];
}

export interface Course {
  id: number;
  termId: number;
  userId: number;
  title: string;
  courseCode: string;
}
