import { getCourses } from "@/actions/courses";
import { Course } from "@/types";
import { useEffect, useState } from "react";

export const useCoursesHook = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const res = getCourses().then((results) => {
      // console.log("Results are ", results);
      setCourses(results);
    });
  }, []);

  return { courses, setCourses };
};
