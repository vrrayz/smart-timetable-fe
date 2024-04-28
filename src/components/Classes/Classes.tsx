"use client";

import { Button, ListItem } from "@/styles";
import React, { useCallback, useEffect, useState } from "react";
import { AddClassModal } from "./AddClassModal";
import { useTodaysClassesHook } from "./hooks/useClassesHook";
import { millisecondsToStandardTime } from "@/helpers";
import { NoItem } from "../NoItem";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faPencil } from "@fortawesome/free-solid-svg-icons";
import { EditClassModal } from "./EditClassModal";
import { Classes as ClassType } from "@/types";
import { DeleteModal } from "../modals/DeleteModal";
import { deleteClasses } from "@/actions/classes";
import { ErrorModal } from "../modals/ErrorModal";
import { useCurrentTermsHook } from "../Terms/hooks/useCurrentTermHook";
import { RedirectToCreateTermModal } from "../modals/RedirectToCreateTermModal";

interface Props {
  isFromTabs?: boolean;
}

export const Classes = ({ isFromTabs }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const { currentTerm } = useCurrentTermsHook();
  const { todaysClasses, setTodaysClasses } = useTodaysClassesHook(
    currentTerm,
    isFromTabs
  );
  const [currentSelectedClass, setCurrentSelectedClass] = useState<ClassType>();

  const displayEditModal = (classes: ClassType) => {
    setCurrentSelectedClass(classes);
    setShowEditModal(true);
  };
  const displayDeleteModal = (classes: ClassType) => {
    setCurrentSelectedClass(classes);
    setShowDeleteModal(true);
  };
  const performAction = useCallback(() => {
    if (currentSelectedClass) {
      deleteClasses({}, currentSelectedClass?.id).then(async (res) => {
        if (res.statusCode !== 200) setShowErrorModal(true);
        else {
          setTodaysClasses(
            todaysClasses.filter((item) => item.id !== currentSelectedClass?.id)
          );
          setShowDeleteModal(false);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todaysClasses, currentSelectedClass]);
  useEffect(() => {
    console.log("The classes here === ", todaysClasses);
  }, [todaysClasses]);
  return (
    <>
      {!currentTerm && <RedirectToCreateTermModal />}
      {!isFromTabs && (
        <div className="text-center flex place-content-around mb-4">
          <span className="text-2xl font-bold ">Classes</span>
          <Button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New Class
          </Button>
        </div>
      )}
      {showModal && currentTerm && (
        <AddClassModal
          setShowModal={setShowModal}
          classes={todaysClasses}
          setClasses={setTodaysClasses}
          currentTerm={currentTerm}
        />
      )}
      {showEditModal && currentTerm && currentSelectedClass && (
        <EditClassModal
          setShowModal={setShowEditModal}
          currentSelectedClass={currentSelectedClass}
          currentTerm={currentTerm}
        />
      )}
      {showDeleteModal && currentSelectedClass && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          deleteAction={performAction}
          message="Are you sure you want to delete this class"
        />
      )}
      {showErrorModal && (
        <ErrorModal title={"Error Deleting Term"} setShowModal={setShowModal} />
      )}
      {todaysClasses.length > 0 ? (
        <>
          {todaysClasses.map((item, i) => (
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
      ) : (
        <NoItem imgName={"scheduler"} itemName={"classes"} />
      )}
    </>
  );
};

const CustomListItem = styled(ListItem)`
  justify-content: space-between;
  padding-left: 16px;
`;
