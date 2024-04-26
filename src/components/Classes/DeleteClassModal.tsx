import React, { useState } from "react";
import { ErrorModal, closeModal } from "../ErrorModal";
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
import { deleteClasses } from "@/actions/classes";
import { Classes } from "@/types";

interface Props {
  setShowModal: (value: boolean) => void;
  classId: number;
  classes: Classes[];
  setClasses: (value: Classes[]) => void;
}

export const DeleteClassModal = ({
  setShowModal,
  classId,
  classes,
  setClasses,
}: Props) => {
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const performAction = () => {
    deleteClasses({}, classId).then(async (res) => {
      if (res.statusCode !== 200) setShowErrorModal(true);
      else {
        setClasses(classes.filter((item) => item.id !== classId));
        setShowModal(false);
      }
    });
  };

  return (
    <ModalOverlay
      onClick={(event) => closeModal(event, setShowModal)}
      id="modal-overlay"
    >
      {showErrorModal ? (
        <ErrorModal title={"Error Creating Term"} setShowModal={setShowModal} />
      ) : (
        <Modal>
          <ModalHeading>Warning</ModalHeading>
          <CloseButton onClick={() => setShowModal(false)}>
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </CloseButton>
          <ModalBody className="text-center">
            <FontAwesomeIcon icon={faWarning} size="3x" color="orange" />
            <p>{"Are you sure you want to delete this class"}</p>
            <div className="flex justify-center gap-4 my-3">
              <Button
                className="btn btn-danger w-14"
                onClick={() => performAction()}
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
      )}
    </ModalOverlay>
  );
};
