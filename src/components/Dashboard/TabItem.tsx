import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { Colors } from "@/styles";
import { TabItems } from "./Tabs";

interface Props {
  src: string;
  title: TabItems;
  count: number;
  setCurrentTab: (value: TabItems) => void;
}

export const TabItem = ({ src, title, count, setCurrentTab }: Props) => {
  return (
    <TabItemContainer onClick={() => setCurrentTab(title)}>
      <Image src={src} alt="schedule icon" width={35} height={35} />
      <span className="count">
        <span>{count}</span>
        <span className="title capitalize hidden md:block">{title}</span>
      </span>
    </TabItemContainer>
  );
};
const TabItemContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 16px 0px;
  border-bottom: 4px solid ${Colors.darkslategray}91;
  img {
    margin: auto 0px;
  }
  span {
    font-size: 1.2rem;
    font-weight: 600;
    margin: auto 0px;
    color: ${Colors.darkslategray};
  }
  span.count {
    display: flex;
    flex-direction: column;
  }
  span.title {
    font-size: 0.82rem;
  }
  &.active,
  &:hover {
    border-color: transparent;
  }
`;
