import React, { useState, memo, useRef } from "react"
import { useEditHouse, HouseFragment } from "@split/connector"

import styled from "../application/theme"

interface HouseNameProps {
  house: HouseFragment
}

function HouseName({ house }: HouseNameProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [houseName, setHouseName] = useState<string>(house.name)
  const updateHouse = useEditHouse()

  const handleHouseUpdate = (e: any) => {
    e.preventDefault()
    if (!houseName) return setHouseName(house.name)
    updateHouse({
      variables: {
        houseId: house.id,
        data: {
          name: houseName,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        editHouse: {
          ...house,
          name: houseName,
        },
      },
    })
    if (inputRef.current) inputRef.current.blur()
  }
  return (
    <form onSubmit={handleHouseUpdate}>
      <StyledInput
        ref={inputRef}
        value={houseName}
        onBlur={handleHouseUpdate}
        onChange={e => setHouseName(e.target.value)}
      />
    </form>
  )
}

export default memo(HouseName)

const StyledInput = styled.input`
  outline: 0;
  width: 100%;
  border: 0;
  padding: 0;
  border: 2px solid transparent;
  background-color: transparent;
  color: ${p => p.theme.colorText};
  border-radius: ${p => p.theme.borderRadius};
  font-size: ${p => p.theme.textL};
  font-weight: ${p => p.theme.fontBlack};
`
