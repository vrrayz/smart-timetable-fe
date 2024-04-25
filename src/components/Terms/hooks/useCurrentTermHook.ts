import { getCurrentTerm } from "@/actions/terms";
import { CurrentTerm } from "@/types";
import { useEffect, useState } from "react";

export const useCurrentTermsHook = () => {
  const [currentTerm, setCurrentTerm] = useState<CurrentTerm>();
  useEffect(() => {
    const res = getCurrentTerm().then((results) => {
      // console.log("Results are ", results);
      setCurrentTerm(results);
    });
  }, []);

  return { currentTerm, setCurrentTerm }
};
