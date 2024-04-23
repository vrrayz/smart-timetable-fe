import { Button } from "@/styles";
import React, { useState } from "react";
import { AddCourseModal } from "./AddCourseModal";
import { Term } from "@/types";

interface Props {
  term: Term;
  setTerms?: (value: Term[]) => void;
}

export const AddCourse = ({ term, setTerms }: Props) => {
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
          term={term}
          //   setTerms={setTerms}
        />
      )}
    </>
  );
};
