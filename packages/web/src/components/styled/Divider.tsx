import React, { FC } from "react"
import { styled, darken } from "@noquarter/ui"

const Divider: FC = () => {
  return <StyledDivider />
}

export default Divider

const StyledDivider = styled.div`
  width: 100%;
  height: 2px;
  margin: ${p => p.theme.paddingM} 0;
  padding: 0 ${p => p.theme.paddingM};
  background-color: ${p => darken(0.01, p.theme.colorBackground)};
`
