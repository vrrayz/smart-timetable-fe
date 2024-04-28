'use client';

import React from "react";
import styled from "styled-components";
import Image from "next/image";

interface Props{
    imgName: string;
    itemName: string;
}

export const NoItem = ({imgName, itemName}:Props) => {
  return (
    <Container className="no-value">
      <NoValueContainer>
        <Image
          src={`/images/icons/${imgName}.png`}
          width={100}
          height={100}
          alt="exam_icon"
          className="mx-auto"
        />
        <h2>There are no {itemName} today</h2>
      </NoValueContainer>
    </Container>
  );
};
export const Container = styled.div`
  &.no-value{
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
export const NoValueContainer = styled.div`
  opacity: 0.3;
  text-align: center;
  margin: auto;
`;
