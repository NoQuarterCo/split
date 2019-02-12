import React, { memo, InputHTMLAttributes } from "react"
import styled from "../application/theme"

function Radio(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <StyledLabel htmlFor={props.id}>
      <HiddenInput type="radio" {...props} />
      <StyledRadio />
    </StyledLabel>
  )
}

export default memo(Radio)

const HiddenInput = styled.input`
  opacity: 0;
  border: 0;
  height: 0;
  width: 0;
  margin: 0;
`

const StyledLabel = styled.label`
  user-select: none;
  cursor: pointer;
  position: relative;

  ${HiddenInput} {
    &:checked ~ div:after {
      opacity: 1;
    }
  }

  ${HiddenInput} {
    &:focus ~ div {
      border: 2px solid ${p => p.theme.colorSecondary};
    }
  }
`

const StyledRadio = styled.div`
  height: 26px;
  width: 26px;
  border-radius: 50%;
  border: 2px solid ${p => p.theme.colorHighlight};

  &:hover {
    border: 2px solid ${p => p.theme.colorSecondary};
  }

  &::after {
    content: "";
    transition: all 200ms;
    position: absolute;
    opacity: 0;
    top: 6px;
    left: 6px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    box-shadow: 0 0 5px 0 rgba(237, 96, 211, 0.5);
    background-color: ${p => p.theme.colorSecondary};
  }
`
