"use client";

import React, { useState } from "react";
import { useTermsHook } from "./hooks/useTermsHook";
import { NoItem } from "../NoItem";
import styled from "styled-components";
import { Button, Colors, ListItem } from "@/styles";
import { AddTermsModal } from "./AddTermsModal";
import { AddCourse } from "./AddCourse";
import { Term } from "@/types";
import { useCurrentTermsHook } from "./hooks/useCurrentTermHook";
import { updateCurrentTerm } from "@/actions/terms";
import { ErrorModal } from "../modals/ErrorModal";

export const Terms = () => {
  const { terms, setTerms } = useTermsHook();
  const { currentTerm, setCurrentTerm } = useCurrentTermsHook();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const changeCurrentTerm = (termId: number) => {
    updateCurrentTerm(termId).then(async (res) => {
      if (res.statusCode !== 200) setShowErrorModal(true);
      else {
        setCurrentTerm({ termId });
      }
    });
  };
  return (
    <>
      {showErrorModal && (
        <ErrorModal
          title={"Current Term Update Error"}
          setShowModal={setShowErrorModal}
        />
      )}
      <div className="text-center flex place-content-around mb-4">
        <span className="text-2xl font-bold ">Terms</span>
        <Button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Term
        </Button>
      </div>
      {terms.length > 0 ? (
        <>
          {terms.map((term, i) => (
            <ListItem key={term.id}>
              <div>
                <h1 className="font-bold">{term.title}</h1>
                <span className="text-sm">
                  {new Date(term.startDate).toDateString()} -{" "}
                  {new Date(term.endDate).toDateString()}
                </span>
                {currentTerm && currentTerm.termId === term.id ? (
                  <span className="text-sm block text-teal">Current Term</span>
                ) : (
                  <Button
                    className="btn btn-primary text-sm block"
                    onClick={() => changeCurrentTerm(term.id)}
                  >
                    Set Current Term
                  </Button>
                )}
              </div>
              <div className="my-auto flex flex-col">
                <span className="">{term.courses.length} Courses</span>
                <AddCourse
                  currentTerm={term}
                  setTerms={setTerms}
                  terms={terms}
                  index={i}
                />
              </div>
            </ListItem>
          ))}
        </>
      ) : (
        <NoItem imgName={"scheduler"} itemName={"terms"} />
      )}

      {showModal && (
        <AddTermsModal
          setShowModal={setShowModal}
          terms={terms}
          setTerms={setTerms}
        />
      )}
    </>
  );
};
