import { getClasses } from "@/actions/classes";
import { getExams } from "@/actions/exams";
import { CurrentTerm, Exam } from "@/types";
import { useEffect, useState } from "react";
import { Exams } from "../Exam";

export const useExamHook = (currentTerm?: CurrentTerm) => {
  const [exams, setExams] = useState<Exam[]>([]);
  useEffect(() => {
    const res = getExams().then((results) => {
      if (currentTerm) {
        setExams(
          results.filter((result: Exam) => result.termId === currentTerm.termId)
        );
      }
      // console.log("Results are ", results);
    });
  }, [currentTerm]);

  return { exams, setExams };
};
