import { getClasses } from "@/actions/classes";
import { Classes, CurrentTerm } from "@/types";
import { useEffect, useState } from "react";

export const useClassesHook = (currentTerm?: CurrentTerm) => {
  const [classes, setClasses] = useState<Classes[]>([]);
  useEffect(() => {
    const res = getClasses().then((results) => {
      if (currentTerm)
        setClasses(
          results.filter(
            (result: Classes) => result.termId === currentTerm.termId
          )
        );
    });
  }, [currentTerm]);

  return { classes, setClasses };
};

export const useTodaysClassesHook = (
  currentTerm?: CurrentTerm,
  isFromTabs?: boolean
) => {
  const { classes } = useClassesHook(currentTerm);
  const [todaysClasses, setTodaysClasses] = useState<Classes[]>([]);

  useEffect(() => {
    if (isFromTabs) {
      const date = new Date().toLocaleDateString("en-US", {
        weekday: "long",
      });
      setTodaysClasses(
        classes
          .filter((item) => {
            return item.schedule[0].days.indexOf(date) >= 0;
          })
          .map((item) => {
            return { ...item, schedule: [{ ...item.schedule[0], days: date }] };
          })
      );
    } else setTodaysClasses(classes);
  }, [classes, currentTerm, isFromTabs]);

  return { todaysClasses, setTodaysClasses };
};
