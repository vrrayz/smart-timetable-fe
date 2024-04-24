import { getStudyPreference } from "@/actions/studyPreference";
import { StudyPreferenceInterface } from "@/types";
import { useEffect, useState } from "react";

export const useStudyPrefernceHook = () => {
  const [studyPreference, setStudyPreference] = useState<StudyPreferenceInterface>();
  useEffect(() => {
    const res = getStudyPreference().then((results) => {
      console.log("Results are ", results);
      setStudyPreference(results);
    });
  }, []);

  return { studyPreference, setStudyPreference }
};
