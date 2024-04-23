export * from "./screen";
export * from "./colors";
export * from "./fonts";
export * from "./modals";

import styled from "styled-components";
import { Poppins } from "./fonts";
import { Colors } from "./colors";

export const GRADIENT_BG = `linear-gradient(
    90deg,
    rgba(0, 36, 0, 1) 0%,
    rgba(2, 100, 50, 1) 35%,
    rgba(0, 255, 150, 1) 100%
  )`;

export const LinkedButton = styled.a`
  padding: 16px;
  border-radius: 24px;
  background: #fff;
  font-size: 0.85rem;
  font-family: "Mulish", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  color: rgb(2, 100, 50);
  letter-spacing: 2px;
`;

export const Button = styled.button`
  border: 1px solid #717171;
  padding: 6px 8px;
  // width: 100%;
  border-radius: 3px;
  font-family: ${Poppins};

  &.btn-primary {
    background: ${Colors.teal};
    color: ${Colors.white};
    border-color: ${Colors.teal};
  }
  &.btn-primary.active,
  &.btn-primary:hover {
    background: ${Colors.saddlebrown};
    border-color: ${Colors.saddlebrown};
  }
`;
