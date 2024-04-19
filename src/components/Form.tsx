"use client";

import { Colors, Poppins, SCREENS } from "@/styles";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

interface Prop {
  icon: IconDefinition;
  placeholder: string;
  className?: string;
}

export const CustomInput = ({ icon, placeholder, className }: Prop) => {
  return (
    <InputContainer className={className}>
      <InputIcon icon={icon} />
      <StyledInput placeholder={placeholder} />
    </InputContainer>
  );
};

export const FormContainer = styled.div`
  box-shadow: #00000059 0px 0px 14px 2px;
  ${SCREENS.sm} {
    max-width: 360px;
  }
  ${SCREENS.lg} {
    max-width: 720px;
  }
  margin: auto;
`;

export const Input = styled.input`
  border: 1px solid #717171;
  padding: 6px 8px;
  width: 100%;
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
export const Label = styled.label`
  font-family: ${Poppins};
`;

export const SideBackground = styled.div`
  background: url(/images/student.jpg);
  background-position: center;
  background-size: cover;
`;
export const ErrorMessage = styled.span`
  font-size: 12px;
  color: ${Colors.red};
  margin-bottom: 8px;
  display: block;
`;
const InputContainer = styled.div`
  display: flex;
  border-radius: 25px;
  background: ${Colors.whitesmoke};
  padding: 8px 16px;
  gap: 6px;
  height: 42px
`;
const StyledInput = styled(Input)`
  background: transparent;
  border: none !important;
  outline: none !important;
`;
const InputIcon = styled(FontAwesomeIcon)`
  margin: auto;
  color: #666;
`;
