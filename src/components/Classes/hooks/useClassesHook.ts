import { getClasses } from "@/actions/classes";
import { Classes, CurrentTerm } from "@/types";
import { useEffect, useState } from "react";

export const useClassesHook = (currentTerm?: CurrentTerm) => {
  const [classes, setClasses] = useState<Classes[]>([]);
  useEffect(() => {
    const res = getClasses().then((results) => {
      // console.log("Results are ", results);
      if(currentTerm) setClasses(results.filter((result: Classes) => result.termId === currentTerm.termId));
    });
  }, [currentTerm]);

  return { classes, setClasses }
};
