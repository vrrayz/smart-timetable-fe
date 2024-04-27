"use client";

import { Button, ListItem } from "@/styles";
import React, { useCallback, useEffect, useState } from "react";
import { AddExamModal } from "./AddExamModal";
import { useExamHook } from "./hooks/useExamHook";
import { millisecondsToStandardTime } from "@/helpers";
import { NoItem } from "../NoItem";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Exam } from "@/types";
import { DeleteModal } from "../modals/DeleteModal";
import { deleteExams } from "@/actions/exams";
import { ErrorModal } from "../modals/ErrorModal";
import { EditExamModal } from "./EditExamModal";

export const Exams = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const { exams, setExams } = useExamHook();
  const [currentSelectedExam, setCurrentSelectedExam] = useState<Exam>();

  const displayEditModal = (exam: Exam) => {
    setCurrentSelectedExam(exam);
    setShowEditModal(true);
  };
  const displayDeleteModal = (exam: Exam) => {
    setCurrentSelectedExam(exam);
    setShowDeleteModal(true);
  };
  const performAction = useCallback(() => {
    if (currentSelectedExam) {
      deleteExams({}, currentSelectedExam?.id).then(async (res) => {
        if (res.statusCode !== 200) setShowErrorModal(true);
        else {
          setExams(
            exams.filter((item) => item.id !== currentSelectedExam?.id)
          );
          setShowDeleteModal(false);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exams, currentSelectedExam]);
  useEffect(() => {
    console.log("The exams here === ", exams);
  }, [exams]);
  return (
    <>
      <div className="text-center flex place-content-around mb-4">
        <span className="text-2xl font-bold ">Exams</span>
        <Button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Exam
        </Button>
      </div>
      {showModal && (
        <AddExamModal
          setShowModal={setShowModal}
          exams={exams}
          setExams={setExams}
        />
      )}
      {showEditModal && currentSelectedExam && (
        <EditExamModal
          setShowModal={setShowEditModal}
          currentSelectedExam={currentSelectedExam}
        />
      )}
      {showDeleteModal && currentSelectedExam && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          deleteAction={performAction}
          message="Are you sure you want to delete this exam"
        />
      )}
      {showErrorModal && (
        <ErrorModal title={"Error Deleting Term"} setShowModal={setShowModal} />
      )}
      {exams.length > 0 ? (
        <>
          {exams.map((item, i) => (
            <CustomListItem key={item.id}>
              <div>
                <h1 className="font-bold">{item.Course.title}</h1>
                <span className="text-sm block">{item.schedule[0].days}</span>
                <span className="text-sm">
                  {millisecondsToStandardTime(item.schedule[0].startTime)} -{" "}
                  {millisecondsToStandardTime(item.schedule[0].endTime)}
                </span>
              </div>
              <div className="my-auto flex pr-4">
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
              </div>
            </CustomListItem>
          ))}
        </>
      ) : (
        <NoItem imgName={"scheduler"} itemName={"exams"} />
      )}
    </>
  );
};

const CustomListItem = styled(ListItem)`
  justify-content: space-between;
  padding-left: 16px;
`;
