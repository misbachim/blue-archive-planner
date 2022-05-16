import React, { useState } from 'react'
import styled from 'styled-components';
import { MdDoubleArrow } from 'react-icons/md';
import { InputNumber } from './InputNumber';
import { GoalDetail } from './GoalDetail';
import { useMainGoals } from '../../../../contexts/MainGoalContext';
import useUpdateEffect from './../../../../hooks/useUpdateEffect';
import { ACTION } from './../../../../constant/ActionConstant';
import CostUtil from '../../../../util/CostUtil';

export default function TabLevel({ selectedCharacter }) {
  const { mainGoals, dispatch } = useMainGoals()
  const { getLevelCost } = CostUtil()
  
  const [currentLevel, setCurrentLevel] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().current.level : 1)
  const [goalLevel, setGoalLevel] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().goal.level : 1)
  
  const [cost, setCost] = useState(getLevelCost(currentLevel, goalLevel))
  
  function getCharacterGoal() {
    return mainGoals.find(e => e.type==="character" && e.character===selectedCharacter)
  }

  function resetCost() {
    setCurrentLevel(goalLevel)
  }

  useUpdateEffect(() => {
    if (getCharacterGoal() === undefined) {
      dispatch({
        type: ACTION.ADD,
        payload: {
          type: 'character',
          character: selectedCharacter,
          current: {
            level: currentLevel
          },
          goal: {
            level: goalLevel
          }
        }
      })
    }
    if (getCharacterGoal() !== undefined) {
      dispatch({
        type: ACTION.EDIT,
        payload: {
          id: getCharacterGoal().id,
          type: 'character',
          character: selectedCharacter,
          current: {
            level: currentLevel
          },
          goal: {
            level: goalLevel
          }
        }
      })
    }
    setCost(getLevelCost(currentLevel, goalLevel))
  }, [currentLevel, goalLevel])
  
  return (
    <>
    <Title>LEVEL</Title>
    <Wrapper>
      <InputNumber min={1} max={78} state={currentLevel} setState={setCurrentLevel} />
      <Arrow />
      <InputNumber min={currentLevel} max={78} state={goalLevel} setState={setGoalLevel} />
    </Wrapper>
    {currentLevel !== goalLevel ? 
      <GoalDetail cost={cost} resetCost={resetCost} />
      : ''
    }
    </>
  )
}

const Title = styled.div`
  color: rgba(14,165,233,1);
  font-weight: 600;
  font-size: .875rem;
  line-height: 1.25rem;
  text-align: center;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 0.25rem;
  margin: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(51,65,85);
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const Arrow = styled(MdDoubleArrow)`
`