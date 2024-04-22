"use client";

import React, { useEffect } from "react";
import { useTermsHook } from "./hooks/useTermsHook";
import { NoItem } from "../NoItem";
import styled from "styled-components";
import { Colors } from "@/styles";

export const Terms = () => {
  const { terms } = useTermsHook();
  useEffect(() => {
    console.log("Current Terms === ", terms);
  }, [terms]);
  return (
    <>
      {terms.length > 0 ? (
        <>
          {terms.map((term, i) => (
            <TermsListItem key={term.id}>
              <div>
                <h1 className="font-bold">{term.title}</h1>
                <span className="text-sm">
                  {new Date(term.startDate).toDateString()} - {new Date(term.endDate).toDateString()}
                </span>
              </div>
              <span className="my-auto">{ term.courses.length } Courses</span>
            </TermsListItem>
          ))}
        </>
      ) : (
        <NoItem imgName={"scheduler"} itemName={"terms"} />
      )}
      {/* <h1>{terms}</h1> */}
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
