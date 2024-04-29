"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useCurrentTermsHook } from "../Terms/hooks/useCurrentTermHook";
import { RedirectToCreateTermModal } from "../modals/RedirectToCreateTermModal";
import { useCoursesHook } from "@/hooks/useCoursesHook";
import { useStudyPrefernceHook } from "../StudyPreference/hooks/useStudyPreference";
import { RedirectToPreferenceModal } from "../modals/RedirectToPreferenceModal";
import {
  useTimetableHook,
  useTodaysTimetableHook,
} from "./hooks/useTimetableHook";
import { Button, ListItem } from "@/styles";
import { generateTimetable, saveGeneratedTimetable } from "@/actions/timetable";
import { ErrorModal } from "../modals/ErrorModal";
import { GeneratedTimeTableMap } from "@/types";
import { GeneratedTimetableView } from "./GeneratedTimetableView";
import { redirect } from "next/navigation";
import styled from "styled-components";
import { millisecondsToStandardTime } from "@/helpers";

interface Props {
  isFromTabs?: boolean;
}

export const Timetable = ({ isFromTabs }: Props) => {
  const { currentTerm } = useCurrentTermsHook();
  const { courses } = useCoursesHook(currentTerm);
  const { studyPreference } = useStudyPrefernceHook();
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showGeneratedTimetableModal, setShowGeneratedTimetableModal] =
    useState<boolean>(false);
  const { todaysTimetable, setTodaysTimetable } =
    useTodaysTimetableHook(currentTerm);
  const [generatedTimetable, setGeneratedTimetable] =
    useState<GeneratedTimeTableMap>();
  const [isFormActionSuccessful, setIsFormActionSuccessful] =
    useState<boolean>(false);

  const generate = useCallback(() => {
    if (currentTerm) {
      generateTimetable(currentTerm?.termId).then(async (res) => {
        if (res.statusCode !== 200) setShowErrorModal(true);
        else {
          setGeneratedTimetable(res.data);
          setShowGeneratedTimetableModal(true);
        }
      });
    }
  }, [currentTerm]);

  const saveTimetable = useCallback(() => {
    if (generatedTimetable && currentTerm) {
      saveGeneratedTimetable(
        { data: generatedTimetable },
        currentTerm?.termId
      ).then(async (res) => {
        if (res.statusCode !== 200) setShowErrorModal(true);
        else {
          //   setGeneratedTimetable(res.data);
          setShowGeneratedTimetableModal(false);
          setIsFormActionSuccessful(true);
        }
      });
    }
  }, [generatedTimetable, currentTerm]);

  useEffect(() => {
    if (isFormActionSuccessful) redirect("/dashboard/timetable");
  }, [isFormActionSuccessful]);
  useEffect(() => {
    console.log("The generated timetable === ", generatedTimetable);
  }, [generatedTimetable]);

  return (
    <>
      {!isFromTabs && (
        <>
          {!currentTerm && <RedirectToCreateTermModal />}
          {courses.length === 0 && (
            <RedirectToCreateTermModal message="You haven't added any course to your current term" />
          )}
          {!studyPreference && <RedirectToPreferenceModal />}
        </>
      )}
      {showErrorModal && (
        <ErrorModal
          title={"Timetable Error"}
          setShowModal={setShowErrorModal}
        />
      )}
      {todaysTimetable.length === 0 && !isFromTabs && (
        <div className="text-center flex place-content-around mb-4">
          <span className="text-2xl font-bold "></span>
          <Button className="btn btn-primary" onClick={() => generate()}>
            Generate Timetable {generatedTimetable && "Again"}
          </Button>
          {generatedTimetable && (
            <Button
              className="btn btn-secondary"
              onClick={() => saveTimetable()}
            >
              Save
            </Button>
          )}
        </div>
      )}
      {todaysTimetable.length > 0 && (
        <>
          {todaysTimetable.map((item, i) => (
            <CustomListItem key={i}>
              <div>
                <h1 className="font-bold">{item.Course.title}</h1>
                <span className="text-sm block">{item.schedule[0].days}</span>
                <span className="text-sm">
                  {millisecondsToStandardTime(item.schedule[0].startTime)} -{" "}
                  {millisecondsToStandardTime(item.schedule[0].endTime)}
                </span>
              </div>
              <div className="my-auto flex pr-4"></div>
            </CustomListItem>
          ))}
        </>
      )}
      {showGeneratedTimetableModal && generatedTimetable && (
        <GeneratedTimetableView generatedTimetable={generatedTimetable} />
      )}
    </>
  );
};
const CustomListItem = styled(ListItem)`
  justify-content: space-between;
  padding-left: 16px;
`;
