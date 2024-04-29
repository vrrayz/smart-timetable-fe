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
import {
  deleteTimetable,
  generateTimetable,
  saveGeneratedTimetable,
} from "@/actions/timetable";
import { ErrorModal } from "../modals/ErrorModal";
import { GeneratedTimeTableMap, Timetable as TimetableType } from "@/types";
import { GeneratedTimetableView } from "./GeneratedTimetableView";
import { redirect } from "next/navigation";
import styled from "styled-components";
import { millisecondsToStandardTime } from "@/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faPencil } from "@fortawesome/free-solid-svg-icons";
import { EditTimetableModal } from "./EditTimetableModal";
import { DeleteModal } from "../modals/DeleteModal";

interface Props {
  isFromTabs?: boolean;
}

export const Timetable = ({ isFromTabs }: Props) => {
  const { currentTerm } = useCurrentTermsHook();
  const { courses } = useCoursesHook(currentTerm);
  const { studyPreference } = useStudyPrefernceHook();
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showGeneratedTimetableModal, setShowGeneratedTimetableModal] =
    useState<boolean>(false);
  const { todaysTimetable, setTodaysTimetable } =
    useTodaysTimetableHook(currentTerm, isFromTabs);
  const [generatedTimetable, setGeneratedTimetable] =
    useState<GeneratedTimeTableMap>();
  const [isFormActionSuccessful, setIsFormActionSuccessful] =
    useState<boolean>(false);

  const [currentSelectedTimetable, setCurrentSelectedTimetable] =
    useState<TimetableType>();

  const displayDeleteModal = (timetable: TimetableType) => {
    setCurrentSelectedTimetable(timetable);
    setShowDeleteModal(true);
  };
  const displayEditModal = (timetable: TimetableType) => {
    setCurrentSelectedTimetable(timetable);
    setShowEditModal(true);
  };
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

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
  const performAction = useCallback(() => {
    if (currentSelectedTimetable) {
      deleteTimetable({}, currentSelectedTimetable?.id).then(async (res) => {
        if (res.statusCode !== 200) setShowErrorModal(true);
        else {
          setTodaysTimetable(
            todaysTimetable.filter(
              (item) => item.id !== currentSelectedTimetable?.id
            )
          );
          setShowDeleteModal(false);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todaysTimetable, currentSelectedTimetable]);

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
      {showEditModal && currentTerm && currentSelectedTimetable && (
        <EditTimetableModal
          setShowModal={setShowEditModal}
          currentSelectedTimetable={currentSelectedTimetable}
          currentTerm={currentTerm}
        />
      )}
      {showDeleteModal && currentSelectedTimetable && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          deleteAction={performAction}
          message="Are you sure you want to delete this item from your study timetable"
        />
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
              <div className="my-auto flex pr-4">
                {!isFromTabs && (
                  <>
                    <Button
                      className="btn btn-secondary text-sm my-auto mr-1"
                      onClick={() => displayEditModal(item)}
                    >
                      <FontAwesomeIcon icon={faPencil} size="sm" />
                    </Button>
                    <Button
                      className="btn btn-danger text-sm my-auto mr-1"
                      onClick={() => displayDeleteModal(item)}
                    >
                      <FontAwesomeIcon icon={faDeleteLeft} size="sm" />
                    </Button>
                  </>
                )}
              </div>
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
