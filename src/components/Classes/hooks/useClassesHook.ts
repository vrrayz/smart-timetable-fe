import { getClasses } from "@/actions/classes";
import { Classes } from "@/types";
import { useEffect, useState } from "react";

export const useClassesHook = () => {
  const [classes, setClasses] = useState<Classes[]>([]);
  useEffect(() => {
    const res = getClasses().then((results) => {
      // console.log("Results are ", results);
      setClasses(results);
    });
  }, []);

  return { classes, setClasses }
};
