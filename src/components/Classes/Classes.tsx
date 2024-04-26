"use client";

import { Button } from "@/styles";
import React, { useState } from "react";
import { AddClassModal } from "./AddClassModal";
import { useClassesHook } from "./hooks/useClassesHook";

export const Classes = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { classes, setClasses } = useClassesHook();
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
    </>
  );
};
