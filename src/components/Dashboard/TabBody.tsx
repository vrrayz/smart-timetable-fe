"use client";

import React from "react";
import { TabItems } from "./Tabs";
import { NoItem } from "../NoItem";
import { Classes } from "../Classes/Classes";
import { Tasks } from "../Tasks/Tasks";
import { Exams } from "../Exams/Exam";

interface Props {
  tabItem: TabItems;
}

export const TabBody = ({ tabItem }: Props) => {
  return (
    <>
      {(tabItem === "class" || tabItem === "classes") && (
        <Classes isFromTabs={true} />
      )}
      {(tabItem === "task" || tabItem === "tasks") && (
        <Tasks isFromTabs={true} />
      )}
      {(tabItem === "exam" || tabItem === "exams") && (
        <Exams isFromTabs={true} />
      )}
    </>
  );
};
