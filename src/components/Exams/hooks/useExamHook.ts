import { getClasses } from "@/actions/classes";
import { getExams } from "@/actions/exams";
import { CurrentTerm, Exam } from "@/types";
import { useEffect, useState } from "react";

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
export const useTodaysExamsHook = (currentTerm?: CurrentTerm, isFromTabs?: boolean) => {
  const { exams } = useExamHook(currentTerm);
  const [todaysExams, setTodaysExams] = useState<Exam[]>([]);

  useEffect(() => {
    if (isFromTabs) {
      const date = new Date().toLocaleDateString("en-US", {
        weekday: "long",
      });
      const dateMs = new Date(new Date().toISOString().split("T")[0]).getTime();
      setTodaysExams(
        exams
          .filter((item) => {
            const startDateMs = new Date(
              new Date(item.schedule[0].startDate).toISOString().split("T")[0]
            ).getTime();
            return startDateMs === dateMs;
          })
          .map((item) => {
            return { ...item, schedule: [{ ...item.schedule[0], days: date }] };
          })
      );
    } else setTodaysExams(exams);
  }, [exams, isFromTabs]);

  return { todaysExams, setTodaysExams };
};