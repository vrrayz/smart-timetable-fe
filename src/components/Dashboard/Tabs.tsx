import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Colors, SCREENS } from "@/styles";
import { TabItem } from "./TabItem";

export type TabItems = "class" | "tasks" | "exams";
interface Props {
  setCurrentTab: (value: TabItems) => void;
}
export const Tabs = ({ setCurrentTab }: Props) => {
  return (
    <CustomContainer>
      <div></div>
      <TabsContainer>
        <TabItem
          src="/images/icons/class.png"
          count={0}
          title="class"
          setCurrentTab={setCurrentTab}
        />
        <TabItem
          src="/images/icons/tasks.png"
          count={0}
          title="tasks"
          setCurrentTab={setCurrentTab}
        />
        <TabItem
          src="/images/icons/exams.png"
          count={0}
          title="exams"
          setCurrentTab={setCurrentTab}
        />
      </TabsContainer>
    </CustomContainer>
  );
};
const CustomContainer = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr;
`;
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
