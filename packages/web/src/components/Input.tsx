import React, { InputHTMLAttributes, forwardRef, Ref, memo } from "react"
import styled, { lighten } from "../application/theme"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  style?: any
  prefix?: string
}

function Input(
  { label, prefix = "", ...inputProps }: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <StyledContainer>
      {label && <StyledLabel>{label}</StyledLabel>}
      <div style={{ position: "relative" }}>
        <StyledPrefix>{prefix}</StyledPrefix>
        <StyledInput {...inputProps} ref={ref} hasPrefix={!!prefix} />
      </div>
    </StyledContainer>
  )
}

export default memo(forwardRef(Input))

const StyledContainer = styled.div`
  width: 100%;
  padding: ${p => p.theme.paddingS};
`

const StyledLabel = styled.label`
  color: ${p => p.theme.colorLabel};
  font-size: ${p => p.theme.textS};
`

const StyledInput = styled.input<{ hasPrefix?: boolean }>`
  border: 0;
  width: 100%;
  outline: 0;
  background-color: transparent;
  transition: all 200ms;
  appearance: none;
  font-size: ${p => p.theme.textM};
  padding: ${p => p.theme.paddingM} 0;
  ${p => p.hasPrefix && "padding-left: 16px"};
  ${p => p.type === "date" && "padding-bottom: 7px"};
  border-bottom: 2px solid ${p => lighten(0.25, p.theme.colorPink)};
  border-top-left-radius: ${p => p.theme.borderRadius};
  border-top-right-radius: ${p => p.theme.borderRadius};

  &::placeholder {
    color: ${p => p.theme.colorPlaceholder};
  }

  &:focus {
    border-bottom: 2px solid ${p => p.theme.colorPink};
  }
`

const StyledPrefix = styled.span`
  position: absolute;
  left: 0;
  top: 11px;
  color: ${p => p.theme.colorLabel};
`
