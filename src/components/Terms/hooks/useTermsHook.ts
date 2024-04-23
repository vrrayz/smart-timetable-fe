import { getTerms } from "@/actions/terms";
import { Term } from "@/types";
import { useEffect, useState } from "react";

export const useTermsHook = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  useEffect(() => {
    const res = getTerms().then((results) => {
      console.log("Results are ", results);
      setTerms(results);
    });
  }, []);

  return { terms, setTerms }
};
