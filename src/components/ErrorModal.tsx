import { CloseButton, Modal, ModalBody, ModalHeading } from "@/styles";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  title: string;
  message?: string;
  setShowModal: (value: boolean) => void
}

export const ErrorModal = ({ title, message, setShowModal }: Props) => {
  return (
    <Modal>
      <ModalHeading>{title}</ModalHeading>
      <CloseButton onClick={() => setShowModal(false)}>
        <FontAwesomeIcon icon={faXmark} size="lg" />
      </CloseButton>
      <ModalBody className="text-center">
        <FontAwesomeIcon icon={faXmark} size="3x" color="red" />
        <p>{message || 'An error occured while performing this action'}</p>
      </ModalBody>
    </Modal>
  );
};
