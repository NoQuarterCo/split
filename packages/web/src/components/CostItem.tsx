import React, { memo } from "react"
import dayjs from "dayjs"
import { Link } from "@reach/router"
import { AllCosts } from "@split/connector"

import styled, { media } from "../application/theme"
import { round, capitalize } from "../lib/helpers"

import IconOpen from "../assets/images/icon-open.svg"
import IconRepeat from "../assets/images/icon-repeat.svg"
import IconClock from "../assets/images/icon-clock.svg"

import Column from "./styled/Column"
import Avatar from "./Avatar"
import Center from "./styled/Center"
import ToolTip from "./ToolTip"

type CostProps = {
  cost: AllCosts.Costs
}

function CostItem({ cost }: CostProps) {
  return (
    <Link to={`/costs/${cost.id}`}>
      <StyledCost>
        <Column flex={10}>
          <StyledValue>
            <StyledCostName>
              {cost.name}
              <span>{capitalize(cost.category)}</span>
            </StyledCostName>
            {cost.recurring !== "one-off" && (
              <ToolTip message="Recurring cost">
                <StyledInfoIcon src={IconRepeat} width={25} />
              </ToolTip>
            )}
            {dayjs(cost.date).isAfter(dayjs().startOf("day")) && (
              <ToolTip message="Future cost">
                <StyledInfoIcon src={IconClock} width={25} />
              </ToolTip>
            )}
          </StyledValue>
        </Column>
        <Column flex={5}>
          <StyledValue>€ {round(cost.amount * 0.01)}</StyledValue>
        </Column>
        <Column flex={5}>
          <Avatar user={cost.payer} size={40} />
        </Column>
        <Column flex={4}>
          <StyledValue>{dayjs(cost.date).format("DD MMM")}</StyledValue>
        </Column>
        <Column flex={1}>
          <Center>
            <StyledIcon src={IconOpen} width={10} />
          </Center>
        </Column>
      </StyledCost>
    </Link>
  )
}

export default memo(CostItem)

const StyledIcon = styled.img`
  transition: 200ms all;
`
const StyledCost = styled.div`
  width: 100%;
  padding-right: 0;
  margin-bottom: ${p => p.theme.paddingM};
  border: 2px solid transparent;
  background-color: white;
  padding: ${p => p.theme.paddingM};
  border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.flexBetween};

  &:hover {
    cursor: pointer;
    box-shadow: 0 10px 10px 5px rgba(200, 200, 200, 0.1);
  }

  ${p => media.greaterThan("sm")`
    padding: ${p.theme.paddingL};
  `}
`
const StyledValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: ${p => p.theme.textS};
  color: ${p => p.theme.colorHeader};
`

const StyledInfoIcon = styled.img`
  cursor: pointer;
  padding-left: ${p => p.theme.paddingS};
  display: grid;
`

const StyledCostName = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: ${p => p.theme.paddingM};
  span {
    color: ${p => p.theme.colorLabel};
  }
`
