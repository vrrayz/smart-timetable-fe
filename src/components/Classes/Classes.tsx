"use client";

import { Button, ListItem } from "@/styles";
import React, { useEffect, useState } from "react";
import { AddClassModal } from "./AddClassModal";
import { useClassesHook } from "./hooks/useClassesHook";
import { millisecondsToStandardTime } from "@/helpers";
import { NoItem } from "../NoItem";
import styled from "styled-components";

export const Classes = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { classes, setClasses } = useClassesHook();

  useEffect(() => {
    console.log("The classes here === ",classes)
  },[classes])
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
                {/* {currentTerm && currentTerm.termId === term.id ? (
                  <span className="text-sm block text-teal">Current Term</span>
                ) : (
                  <Button
                    className="btn btn-primary text-sm block"
                    onClick={() => changeCurrentTerm(term.id)}
                  >
                    Set Current Term
                  </Button>
                )} */}
              </div>
              <div className="my-auto flex flex-col">
                {/* <span className="">{term.courses.length} Courses</span> */}
                {/* <AddCourse
                  currentTerm={term}
                  setTerms={setTerms}
                  terms={terms}
                  index={i}
                /> */}
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
padding-left:16px;
`