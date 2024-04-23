import {
  CloseButton,
  Modal,
  ModalBody,
  ModalHeading,
  ModalOverlay,
} from "@/styles";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEvent, useState } from "react";
import { ErrorMessage, Input, Label } from "../Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { addTerm } from "@/actions/terms";
import { Term } from "@/types";

type LoginFormInputs = {
  title: string;
  startDate: string;
  endDate: string;
};
interface Props {
  setShowModal: (value: boolean) => void;
  terms: Term[];
  setTerms: (value: Term[]) => void;
}
export const AddTermsModal = ({ setShowModal, terms, setTerms }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const closeModal = (event: any) => {
    if (event.target.id === "modal-overlay") setShowModal(false);
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("The data passed is ", data);
    addTerm(data).then(async (res) => {
      if (res.statusCode !== 200) setShowErrorModal(true);
      else {
        const newTerms = [{...res.message, courses: []} as Term, ...terms];
        setTerms(newTerms);
        setShowModal(false);
      }
    });
    // login(data).then(async (res) => {
    //   setExtraError(res.statusCode !== 200 ? "Incorrect Credentials" : "");
    //   if (res.statusCode === 200) setShouldRedirect(true);
    // });
  };
  return (
    <ModalOverlay onClick={(event) => closeModal(event)} id="modal-overlay">
      {showErrorModal ? (
        <Modal>
          <ModalHeading>Error Creating Term</ModalHeading>
          <CloseButton onClick={() => setShowModal(false)}>
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </CloseButton>
          <ModalBody className="text-center">
            <FontAwesomeIcon icon={faXmark} size="3x" color="red" />
            <p>An error occured while performing this action</p>
          </ModalBody>
        </Modal>
      ) : (
        <Modal>
          <ModalHeading>Add New Term</ModalHeading>
          <CloseButton onClick={() => setShowModal(false)}>
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </CloseButton>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                {...register("title", { required: true })}
                className={`${errors.title ? "mb-0" : "mb-4"}`}
              />
              {errors.title && <ErrorMessage>Title is required</ErrorMessage>}

              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                {...register("startDate", { required: true })}
                className={`${errors.startDate ? "mb-0" : "mb-4"}`}
              />
              {errors.startDate && (
                <ErrorMessage>Start Date is required</ErrorMessage>
              )}

              <Label htmlFor="endDate">End Date</Label>
              <Input
                type="date"
                {...register("endDate", { required: true })}
                className={`${errors.endDate ? "mb-0" : "mb-4"}`}
              />
              {errors.endDate && (
                <ErrorMessage>End Date is required</ErrorMessage>
              )}

              <Input
                type="submit"
                value="Add Term"
                className="btn-primary mb-4"
              />
            </form>
          </ModalBody>
        </Modal>
      )}
    </ModalOverlay>
  );
};
