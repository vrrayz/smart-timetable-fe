"use client";

import React, { useState } from "react";
import { useTermsHook } from "./hooks/useTermsHook";
import { NoItem } from "../NoItem";
import styled from "styled-components";
import { Button, Colors } from "@/styles";
import { AddTermsModal } from "./AddTermsModal";
import { AddCourse } from "./AddCourse";
import { Term } from "@/types";

export const Terms = () => {
  const { terms, setTerms } = useTermsHook();
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <div className="text-center flex place-content-around mb-4">
        <span className="text-2xl font-bold ">Terms</span>
        <Button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Term
        </Button>
      </div>
      {terms.length > 0 ? (
        <>
          {terms.map((term, i) => (
            <TermsListItem key={term.id}>
              <div>
                <h1 className="font-bold">{term.title}</h1>
                <span className="text-sm">
                  {new Date(term.startDate).toDateString()} -{" "}
                  {new Date(term.endDate).toDateString()}
                </span>
              </div>
              <div className="my-auto flex flex-col">
              <span className="">{term.courses.length} Courses</span>
              <AddCourse currentTerm={term} setTerms={setTerms} terms={terms} index={i} />
              </div>
            </TermsListItem>
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

const TermsListItem = styled.div`
  padding: 16px 0px;
  display: flex;
  justify-content: space-around;
  border: 1px solid ${Colors.darkslategray}29;
  border-left: none;
  border-right: none;
`;
