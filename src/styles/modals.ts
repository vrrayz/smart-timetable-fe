import styled from "styled-components";
import { Colors } from "./colors";

export const ModalOverlay = styled.div`
  position: fixed;
  background: #000000b3;
  width: 100vw;
  height: 100vh;
  z-index: 100000;
  backdrop-filter: blur(3px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  top:0;
  left:0;
`;
export const Modal = styled.div`
  background: #fff;
//   min-height: 50%;
  width: 80%;
  max-width: 420px;
  margin: 0px auto;
  border-radius: 12px;
  position: relative;
`;
export const ModalHeading = styled.h1`
  text-align: center;
  border-bottom: 1px solid ${Colors.darkslategray}29;
  padding: 8px;
`;
export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border: 2px solid #fff;
  background: ${Colors.black};
  position: absolute;
  top: -10px;
  right: -10px;
  color: #fff;
  border-radius: 50%;
`;
export const ModalBody = styled.div`
  padding: 8px 16px;
`;
