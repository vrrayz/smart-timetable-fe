"use client";

import { Button, ListItem } from "@/styles";
import React, { useEffect, useState } from "react";
import { AddClassModal } from "./AddClassModal";
import { useClassesHook } from "./hooks/useClassesHook";
import { millisecondsToStandardTime } from "@/helpers";
import { NoItem } from "../NoItem";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { EditClassModal } from "./EditClassModal";
import { Classes as ClassType } from "@/types";

export const Classes = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const { classes, setClasses } = useClassesHook();
  const [currentSelectedClass, setCurrentSelectedClass] = useState<ClassType>();
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState<number>(0);

  const displayEditModal = (classes: ClassType) => {
    setCurrentSelectedClass(classes);
    setShowEditModal(true);
  };
  useEffect(() => {
    console.log("The classes here === ", classes);
  }, [classes]);
  return (
    <>
      <div className="text-center flex place-content-around mb-4">
        <span className="text-2xl font-bold ">Classes</span>
        <Button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Class
        </Button>
      </div>
      {showModal && (
        <AddClassModal
          setShowModal={setShowModal}
          classes={classes}
          setClasses={setClasses}
        />
      )}
      {showEditModal && currentSelectedClass && (
        <EditClassModal
          setShowModal={setShowEditModal}
          currentSelectedClass={currentSelectedClass}
        />
      )}
      {classes.length > 0 ? (
        <>
          {classes.map((item, i) => (
            <CustomListItem key={item.id}>
              <div>
                <h1 className="font-bold">{item.Course.title}</h1>
                <span className="text-sm block">{item.schedule[0].days}</span>
                <span className="text-sm">
                  {millisecondsToStandardTime(item.schedule[0].startTime)} -{" "}
                  {millisecondsToStandardTime(item.schedule[0].endTime)}
                </span>
              </div>
              <div className="my-auto flex flex-col pr-4">
                <Button
                  className="btn btn-secondary text-sm my-auto"
                  onClick={() => displayEditModal(item)}
                >
                  <FontAwesomeIcon icon={faPencil} size="sm" />
                </Button>
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
