import React, { memo, useState } from "react"
import { media } from "../application/theme"
import { styled } from "@noquarter/ui"

import IconSearch from "../assets/images/icon-search.svg"
import IconCancel from "../assets/images/icon-cancel.svg"

interface CostsSearchProps {
  onSubmit: (e: any) => void
  search: string
}

function CostsSearch({ onSubmit, search }: CostsSearchProps) {
  const [inputSearch, setSearch] = useState<string>(search)
  const [focus, setFocus] = useState<boolean>(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit(inputSearch)
  }

  const handleClearSearch = (e: any) => {
    e.preventDefault()
    onSubmit("")
    setSearch("")
  }

  return (
    <StyledSearchForm onSubmit={handleSubmit}>
      <StyledInputWrap focus={focus}>
        <StyledButton type="button" onClick={handleSubmit}>
          <img src={IconSearch} alt="search" width={20} />
        </StyledButton>
        <StyledSearch
          type="text"
          placeholder="Search costs"
          value={inputSearch}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          onChange={(e: any) => setSearch(e.target.value)}
        />
        {inputSearch && (
          <StyledCancelWrapper>
            <StyledButton type="button" onClick={handleClearSearch}>
              <img src={IconCancel} alt="cancel" width={15} />
            </StyledButton>
          </StyledCancelWrapper>
        )}
      </StyledInputWrap>
    </StyledSearchForm>
  )
}

export default memo(CostsSearch)

const StyledSearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const StyledInputWrap = styled.div<{ focus: boolean }>`
  background-color: white;
  width: 100%;
  transition: width 1s ease;
  border-radius: ${p => p.theme.borderRadius};
  padding: ${p => `${p.theme.paddingS} ${p.theme.paddingM}`};
  ${p => p.focus && `box-shadow: 0 5px 10px 5px ${p.theme.colorShadow};`}
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${media.greaterThan("md")`
    transition: width 1s ease;
    width: auto;
  `}
`

const StyledSearch = styled.input`
  appearance: none;
  background-color: transparent;
  border: 0;
  outline: none;
  height: 30px;
  width: 100%;
  line-height: 30px;
  color: ${p => p.theme.colorText};
  padding-left: ${p => p.theme.paddingM};
  padding-right: ${p => p.theme.paddingXL};
  padding-top: ${p => p.theme.paddingS};
  padding-bottom: 8px;
  font-size: ${p => p.theme.textM};

  &::placeholder {
    color: ${p => p.theme.colorTertiary};
  }
`

const StyledButton = styled.button`
  padding: 0;
  outline: 0;
  ${p => p.theme.flexCenter};
`

const StyledCancelWrapper = styled.div`
  position: absolute;
  right: 10px;
`
