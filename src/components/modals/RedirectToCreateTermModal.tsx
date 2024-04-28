import React from "react";
import {
  LinkedButton,
  Modal,
  ModalBody,
  ModalHeading,
  ModalOverlay,
} from "@/styles";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect } from "next/navigation";

interface Props {
  message?: string;
}

export const RedirectToCreateTermModal = ({ message }: Props) => {
  return (
    <ModalOverlay id="modal-overlay">
      <Modal>
        <ModalHeading>Warning</ModalHeading>
        <ModalBody className="text-center">
          <FontAwesomeIcon icon={faWarning} size="3x" color="orange" />
          <p>
            {message ||
              "Please click the button below to create a term before proceeding"}
          </p>
          <div className="flex justify-center gap-4 my-3">
            <LinkedButton
              className="btn btn-secondary w-38"
              href={"/dashboard/terms"}
            >
              Go to Terms Section
            </LinkedButton>
          </div>
        </ModalBody>
      </Modal>
    </ModalOverlay>
  );
};
