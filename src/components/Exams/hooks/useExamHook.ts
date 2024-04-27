import { getClasses } from "@/actions/classes";
import { getExams } from "@/actions/exams";
import { Exam } from "@/types";
import { useEffect, useState } from "react";

export const useExamHook = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  useEffect(() => {
    const res = getExams().then((results) => {
      // console.log("Results are ", results);
      setExams(results);
    });
  }, []);

  return { exams, setExams }
};
