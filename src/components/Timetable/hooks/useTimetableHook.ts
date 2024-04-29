import { getTimetable } from "@/actions/timetable";
import { CurrentTerm, Timetable } from "@/types";
import { useEffect, useState } from "react";

export const useTimetableHook = (currentTerm?: CurrentTerm) => {
  const [timetable, setTimetable] = useState<Timetable[]>([]);
  useEffect(() => {
    const res = getTimetable().then((results) => {
      if (currentTerm)
        setTimetable(
          results.filter(
            (result: Timetable) => result.termId === currentTerm.termId
          )
        );
    });
  }, [currentTerm]);

  return { timetable, setTimetable };
};

// export const useTodaysTimetableHook = (
//   currentTerm?: CurrentTerm,
//   isFromTabs?: boolean
// ) => {
//   const { timetable } = useClassesHook(currentTerm);
//   const [todaysClasses, setTodaysClasses] = useState<Classes[]>([]);

//   useEffect(() => {
//     if (isFromTabs) {
//       const date = new Date().toLocaleDateString("en-US", {
//         weekday: "long",
//       });
//       setTodaysClasses(
//         timetable
//           .filter((item) => {
//             return item.schedule[0].days.indexOf(date) >= 0;
//           })
//           .map((item) => {
//             return { ...item, schedule: [{ ...item.schedule[0], days: date }] };
//           })
//       );
//     } else setTodaysClasses(timetable);
//   }, [timetable, currentTerm, isFromTabs]);

//   return { todaysClasses, setTodaysClasses };
// };
