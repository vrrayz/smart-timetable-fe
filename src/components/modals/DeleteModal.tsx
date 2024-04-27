import React, { useState } from "react";
import { ErrorModal, closeModal } from "./ErrorModal";
import {
  Button,
  CloseButton,
  Modal,
  ModalBody,
  ModalHeading,
  ModalOverlay,
} from "@/styles";
import { faWarning, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Classes } from "@/types";

interface Props {
  setShowModal: (value: boolean) => void;
  deleteAction: () => void;
  message: string;
}

export const DeleteModal = ({ setShowModal, deleteAction, message }: Props) => {
  return (
    <ModalOverlay
      onClick={(event) => closeModal(event, setShowModal)}
      id="modal-overlay"
    >
      <Modal>
        <ModalHeading>Warning</ModalHeading>
        <CloseButton onClick={() => setShowModal(false)}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </CloseButton>
        <ModalBody className="text-center">
          <FontAwesomeIcon icon={faWarning} size="3x" color="orange" />
          <p>{message}</p>
          <div className="flex justify-center gap-4 my-3">
            <Button
              className="btn btn-danger w-14"
              onClick={() => deleteAction()}
            >
              Yes
            </Button>
            <Button
              className="btn btn-secondary w-14"
              onClick={() => setShowModal(false)}
            >
              No
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </ModalOverlay>
  );
};
