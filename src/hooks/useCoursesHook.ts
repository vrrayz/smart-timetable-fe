import { getCourses } from "@/actions/courses";
import { Course, CurrentTerm } from "@/types";
import { useEffect, useState } from "react";

export const useCoursesHook = (currentTerm?: CurrentTerm) => {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const res = getCourses().then((results) => {
      // console.log("Results are ", results);
      if(currentTerm) setCourses(results.filter((result: Course) => result.termId === currentTerm.termId));
    });
  }, [currentTerm]);

  return { courses, setCourses };
};
