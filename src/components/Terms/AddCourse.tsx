import { Button } from "@/styles";
import React, { useState } from "react";
import { AddCourseModal } from "./AddCourseModal";
import { Term } from "@/types";

interface Props {
  currentTerm: Term;
  terms: Term[];
  setTerms: (value: Term[]) => void;
  index: number
}

export const AddCourse = ({ currentTerm, terms, setTerms, index }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <Button
        className="btn btn-secondary text-sm"
        onClick={() => setShowModal(true)}
      >
        Add Course
      </Button>
      {showModal && (
        <AddCourseModal
          setShowModal={setShowModal}
          currentTerm={currentTerm}
          setTerms={setTerms}
          terms={terms}
          index={index}
        />
      )}
    </>
  );
};
