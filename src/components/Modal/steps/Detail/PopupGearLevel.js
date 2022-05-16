import React from 'react'
import styled from 'styled-components'
import { GEAR_MAX_LEVEL_PER_TIER } from './../../../../constant/GearConstant';

export const POPUP_GEAR_TYPE = {
  CURRENT: 'CURRENT',
  GOAL: 'GOAL'
}

export default function PopupGearLevel({
    popupType, 
    currentTier, currentLevel, 
    setCurrentTier, setCurrentLevel,
    goalTier, goalLevel, 
    setGoalTier, setGoalLevel 
  }) {

  function getSelections() {
    let selections = []
    let minTier = 0;
    if (popupType === POPUP_GEAR_TYPE.GOAL) {
      minTier = currentTier
    }
    for (let index = minTier; index < 6; index++) {
      const maxLvl = GEAR_MAX_LEVEL_PER_TIER[index];
      selections.push({ tier: index, level: 1})
      selections.push({ tier: index, level: maxLvl})
    }
    return selections
  }

  function handleOnClick(selection) {
    switch (popupType) {
      case POPUP_GEAR_TYPE.CURRENT:
        setCurrentTier(selection.tier)
        setCurrentLevel(selection.level)
        if (goalTier < selection.tier
            || (goalTier === selection.tier && goalLevel < selection.level)) {
          setGoalTier(selection.tier)
          setGoalLevel(selection.level)
        }
        break;
      case POPUP_GEAR_TYPE.GOAL:
        setGoalTier(selection.tier)
        setGoalLevel(selection.level)
        break;
    
      default:
        break;
    }
  }

  function isActive(selection) {
    switch (popupType) {
      case POPUP_GEAR_TYPE.CURRENT:
        return currentTier===selection.tier && currentLevel===selection.level
      case POPUP_GEAR_TYPE.GOAL:
        return goalTier===selection.tier && goalLevel===selection.level
    
      default:
        return false
    }
  }

  return (
    <Panel>
      <SelectionWrapper>
        {getSelections().map(selection => {
          return (
            <Selection 
              key={'' + selection.tier + selection.level}
              $isActive={isActive(selection)}
              onClick={() => handleOnClick(selection)}
            >
              <TierDiv>
                T{selection.tier+1}
              </TierDiv>
              <LevelDiv $level={selection.level}>
                {selection.level}
              </LevelDiv>
            </Selection>
          )
        })}
      </SelectionWrapper>
    </Panel>
  )
}

const Panel = styled.div`
  padding: 1rem;
  width: 235px;
  border-radius: 0.375rem;
  border: 1px solid #475569;
  background: #334155;
  box-shadow: 0 11px 15px -7px rgb(0 0 0 / 20%), 0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%);
  font-size: 1rem;
  font-weight: 400;
`

const SelectionWrapper = styled.div`
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  margin: -0.25rem;
`

const Selection = styled.button`
  gap: 2px;
  line-height: 1;
  font-weight: 600;
  background-color: rgba(100,116,139,1);
  border-color: transparent;
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  margin: 0.25rem;
  cursor: pointer;
  ${(props) => {
  if (props.$isActive) {
    return `background-color: rgba(14,165,233,1);`
  }}}
`

const TierDiv = styled.div`
  width: 1rem;
  height: 1rem;
  color: rgba(0,0,0,1);
  background-color: rgba(255,255,255,.9);
  border-radius: 9999px;
  line-height: 1.1rem;
  font-size: smaller;
`

const LevelDiv = styled.div`
  ${(props) => {
  if (props.$level === 1) {
    return `opacity: .6`
  }}}
`