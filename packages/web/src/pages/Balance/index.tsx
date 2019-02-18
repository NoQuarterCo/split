import React, { useContext, Fragment } from "react"
import { RouteComponentProps } from "@reach/router"

import styled from "../../application/theme"
import { AppContext } from "../../application/context"

import { round } from "../../lib/helpers"
import Page from "../../components/Page"

import HouseBalance from "../../components/HouseBalance"
import HouseForm from "../../components/HouseForm"
import HouseName from "../../components/HouseName"
import HouseInvite from "../../components/HouseInvite"
import { useHouseQuery } from "../../lib/graphql/house/hooks"
import useUserContext from "../../lib/hooks/useUserContext"

function Balance(_: RouteComponentProps) {
  const user = useUserContext()
  const { house } = useHouseQuery()

  const getBalanceHeader = () => {
    if (user.balance > 0) {
      return `You are owed €${round(user.balance * 0.01, 2)}`
    } else {
      return `You owe €${round(Math.abs(user.balance * 0.01), 2)}`
    }
  }

  return (
    <Page activePage="balance">
      {!user.houseId ? (
        <HouseForm />
      ) : (
        <Fragment>
          <StyledHeader>
            <HouseName house={house} />
            <p>{getBalanceHeader()}</p>
          </StyledHeader>
          <HouseBalance users={house.users} />
          <StyledInviteWrapper>
            <HouseInvite house={house} />
          </StyledInviteWrapper>
        </Fragment>
      )}
    </Page>
  )
}

export default Balance

const StyledHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: ${p => p.theme.paddingXL};

  p {
    padding-left: ${p => p.theme.paddingS};
  }
`

const StyledInviteWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: ${p => p.theme.paddingXL};
`
