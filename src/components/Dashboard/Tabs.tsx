import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Colors, SCREENS } from "@/styles";
import { TabItem } from "./TabItem";
import { useCurrentTermsHook } from "../Terms/hooks/useCurrentTermHook";
import { useTodaysClassesHook } from "../Classes/hooks/useClassesHook";
import { useTodaysTasksHook } from "../Tasks/hooks/useTaskHook";
import { useTodaysExamsHook } from "../Exams/hooks/useExamHook";

export type TabItems =
  | "class"
  | "classes"
  | "task"
  | "tasks"
  | "exam"
  | "exams"
  | "terms";
interface Props {
  setCurrentTab: (value: TabItems) => void;
}
export const Tabs = ({ setCurrentTab }: Props) => {
  const { currentTerm } = useCurrentTermsHook();
  const { todaysClasses } = useTodaysClassesHook(currentTerm, true);
  const { todaysExams } = useTodaysExamsHook(currentTerm, true);
  const { todaysTasks } = useTodaysTasksHook(true);

  return (
    <TabsContainer>
      <TabItem
        src="/images/icons/class.png"
        count={todaysClasses.length}
        title={todaysClasses.length > 1 ? "classes" : "class"}
        setCurrentTab={setCurrentTab}
      />
      <TabItem
        src="/images/icons/tasks.png"
        count={todaysTasks.length}
        title={todaysTasks.length > 1 ? "tasks" : "task"}
        setCurrentTab={setCurrentTab}
      />
      <TabItem
        src="/images/icons/exams.png"
        count={todaysExams.length}
        title={todaysExams.length > 1 ? "exams" : "exam"}
        setCurrentTab={setCurrentTab}
      />
    </TabsContainer>
  );
};

const TabsContainer = styled.div`
  padding: 0px 8px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 0.85rem;
  ${SCREENS.lg} {
    display: grid;
    // justify-content: center;
    // grid-template-columns: 180px 1fr;
    padding: 0px 12px;
  }
  ${SCREENS.xl} {
    display: flex;
    justify-content: space-around;
  }
`;
