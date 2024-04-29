import React from "react";
import { ErrorModal, closeModal } from "../modals/ErrorModal";
import {
  ModalOverlay,
  Modal,
  ModalHeading,
  CloseButton,
  ModalBody,
  ListItem,
} from "@/styles";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { register } from "module";
import { Label, ErrorMessage } from "../Form";
import styled from "styled-components";
import { GeneratedTimeTableMap } from "@/types";
import { millisecondsToStandardTime } from "@/helpers";

interface Props {
  generatedTimetable: GeneratedTimeTableMap;
}

export const GeneratedTimetableView = ({
  generatedTimetable,
}: Props) => {
  const days = Object.keys(generatedTimetable).map((key) => {
    return { day: key, courses: generatedTimetable[key] };
  });
  return (
    <>
      {days.map((item, i) => (
        <CustomListItem key={i}>
          <div>
            <h1 className="font-bold">{item.day}</h1>
            {item.courses.map((course, j) => (
              <div key={j}>
                <span className="text-sm block">{course.courseCode}</span>
                <span className="text-sm">
                  {millisecondsToStandardTime(course.startTime)} -{" "}
                  {millisecondsToStandardTime(course.endTime)}
                </span>
              </div>
            ))}
          </div>
          <div className="my-auto flex pr-4"></div>
        </CustomListItem>
      ))}
    </>
  );
};

const CustomListItem = styled(ListItem)`
  justify-content: space-between;
  padding-left: 16px;
`;
