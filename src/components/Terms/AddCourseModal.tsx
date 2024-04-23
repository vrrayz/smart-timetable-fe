import {
  CloseButton,
  Modal,
  ModalBody,
  ModalHeading,
  ModalOverlay,
} from "@/styles";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { ErrorMessage, Input, Label } from "../Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Course, Term } from "@/types";
import { ErrorModal } from "../ErrorModal";
import { addCourse } from "@/actions/courses";

type CourseFormInputs = {
  termId: number;
  title: string;
  courseCode: string;
};
interface Props {
  setShowModal: (value: boolean) => void;
  currentTerm: Term;
  setTerms: (value: Term[]) => void;
  terms: Term[];
  index: number;
}
export const AddCourseModal = ({
  setShowModal,
  currentTerm,
  setTerms,
  index,
  terms,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormInputs>();

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const closeModal = (event: any) => {
    if (event.target.id === "modal-overlay") setShowModal(false);
  };

  const onSubmit: SubmitHandler<CourseFormInputs> = (data) => {
    console.log("The data passed is ", data);
    addCourse(data).then(async (res) => {
      if (res.statusCode !== 200) setShowErrorModal(true);
      else {
        console.log(res.message);
        const prevTerms = [...terms];
        prevTerms[index].courses.push(res.message as Course);
        // const newTerms = [{ ...res.message, courses: [] } as Term, ...terms];
        setTerms(prevTerms);
        setShowModal(false);
      }
    });
  };
  return (
    <ModalOverlay onClick={(event) => closeModal(event)} id="modal-overlay">
      {showErrorModal ? (
        <ErrorModal
          title={"Error Creating Course"}
          setShowModal={setShowModal}
        />
      ) : (
        <Modal>
          <ModalHeading>Add New Course</ModalHeading>
          <CloseButton onClick={() => setShowModal(false)}>
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </CloseButton>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                type="hidden"
                {...register("termId", { required: true })}
                value={currentTerm.id}
                className={`${errors.title ? "mb-0" : "mb-4"}`}
              />
              <Label htmlFor="term">Term</Label>
              <Input type="text" value={currentTerm.title} disabled />
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                {...register("title", { required: true })}
                className={`${errors.title ? "mb-0" : "mb-4"}`}
              />
              {errors.title && <ErrorMessage>Title is required</ErrorMessage>}

              <Label htmlFor="courseCode">Course Code</Label>
              <Input
                type="text"
                {...register("courseCode", { required: true })}
                className={`${errors.courseCode ? "mb-0" : "mb-4"}`}
              />
              {errors.courseCode && (
                <ErrorMessage>Course code is required</ErrorMessage>
              )}

              <Input
                type="submit"
                value="Add Course"
                className="btn-primary mb-4"
              />
            </form>
          </ModalBody>
        </Modal>
      )}
    </ModalOverlay>
  );
};
