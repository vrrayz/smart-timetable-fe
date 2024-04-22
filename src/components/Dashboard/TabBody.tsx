import React from "react";
import { TabItems } from "./Tabs";
import styled from "styled-components";
import Image from "next/image";

interface Props {
  tabItem: TabItems;
}

export const TabBody = ({ tabItem }: Props) => {
  return (
    <Container className="no-value">
      <NoValueContainer>
        <Image
          src={`/images/icons/${tabItem}.png`}
          width={100}
          height={100}
          alt="exam_icon"
          className="mx-auto"
        />
        <h2>There are no { tabItem }</h2>
      </NoValueContainer>
    </Container>
  );
};

const Container = styled.div`
  &.no-value{
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const NoValueContainer = styled.div`
  opacity: 0.3;
  text-align: center;
  margin: auto;
`;
