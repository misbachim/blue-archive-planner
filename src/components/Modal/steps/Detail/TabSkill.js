import React, { useState } from 'react'
import { MdDoubleArrow } from 'react-icons/md';
import styled from 'styled-components';
import { ACTION } from '../../../../constant/ActionConstant';
import { useMainGoals } from '../../../../contexts/MainGoalContext';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import { GoalDetail } from './GoalDetail'
import { InputNumber } from './InputNumber'
import CostUtil from './../../../../util/CostUtil';

export default function TabSkill({ selectedCharacter }) {
  const { mainGoals, dispatch } = useMainGoals()
  const { getSkillCost } = CostUtil()
  
  const [currentExLevel, setCurrentExLevel] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().ex.current : 1)
  const [goalExLevel, setGoalExLevel] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().ex.goal : 1)
  const [currentNormalLevel, setCurrentNormalLevel] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().normal.current : 1)
  const [goalNormalLevel, setGoalNormalLevel] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().normal.goal : 1)
  const [currentSubLevel, setCurrentSubLevel] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().passive.current : 1)
  const [goalSubLevel, setGoalSubLevel] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().passive.goal : 1)
  const [currentPassiveLevel, setCurrentPassiveLevel] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().sub.current : 1)
  const [goalPassiveLevel, setGoalPassiveLevel] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().sub.goal : 1)
  
  const [cost, setCost] = useState(getSkillCost(
    selectedCharacter, 
    currentExLevel, goalExLevel, 
    currentNormalLevel, goalNormalLevel, 
    currentPassiveLevel, goalPassiveLevel, 
    currentSubLevel, goalSubLevel, 
  ))
  
  function getCharacterGoal() {
    return mainGoals.find(e => e.type==="skill" && e.character===selectedCharacter)
  }

  function resetCost() {
    setCurrentExLevel(goalExLevel)
    setCurrentNormalLevel(goalNormalLevel)
    setCurrentPassiveLevel(goalPassiveLevel)
    setCurrentSubLevel(goalSubLevel)
  }

  useUpdateEffect(() => {
    if (getCharacterGoal() === undefined) {
      dispatch({
        type: ACTION.ADD,
        payload: {
          type: 'skill',
          character: selectedCharacter,
          ex: {
            current: currentExLevel,
            goal: goalExLevel
          },
          normal: {
            current: currentNormalLevel,
            goal: goalNormalLevel
          },
          passive: {
            current: currentPassiveLevel,
            goal: goalPassiveLevel
          },
          sub: {
            current: currentSubLevel,
            goal: goalSubLevel
          },
        }
      })
    }
    if (getCharacterGoal() !== undefined) {
      dispatch({
        type: ACTION.EDIT,
        payload: {
          id: getCharacterGoal().id,
          type: 'skill',
          character: selectedCharacter,
          ex: {
            current: currentExLevel,
            goal: goalExLevel
          },
          normal: {
            current: currentNormalLevel,
            goal: goalNormalLevel
          },
          passive: {
            current: currentPassiveLevel,
            goal: goalPassiveLevel
          },
          sub: {
            current: currentSubLevel,
            goal: goalSubLevel
          },
        }
      })
    }
    setCost(getSkillCost(
      selectedCharacter, 
      currentExLevel, goalExLevel, 
      currentNormalLevel, goalNormalLevel, 
      currentPassiveLevel, goalPassiveLevel, 
      currentSubLevel, goalSubLevel, 
    ))
  }, [
    currentExLevel, goalExLevel,
    currentNormalLevel, goalNormalLevel,
    currentPassiveLevel, goalPassiveLevel,
    currentSubLevel, goalSubLevel,
  ])
  
  return (
    <>
      <Title>SKILL</Title>
      <Wrapper>
        <SkillWrapper>
          <SkillName>EX</SkillName>
          <InputWrapper>
            <InputNumber min={1} max={5} state={currentExLevel} setState={setCurrentExLevel} />
            <Arrow />
            <InputNumber min={currentExLevel} max={5} state={goalExLevel} setState={setGoalExLevel} />
          </InputWrapper>
        </SkillWrapper>
        <SkillWrapper>
          <SkillName>NORMAL</SkillName>
          <InputWrapper>
            <InputNumber min={1} max={10} state={currentNormalLevel} setState={setCurrentNormalLevel} />
            <Arrow />
            <InputNumber min={currentNormalLevel} max={10} state={goalNormalLevel} setState={setGoalNormalLevel} />
          </InputWrapper>
        </SkillWrapper>
        <SkillWrapper>
          <SkillName>PASSIVE</SkillName>
          <InputWrapper>
            <InputNumber min={1} max={10} state={currentPassiveLevel} setState={setCurrentPassiveLevel} />
            <Arrow />
            <InputNumber min={currentPassiveLevel} max={10} state={goalPassiveLevel} setState={setGoalPassiveLevel} />
          </InputWrapper>
        </SkillWrapper>
        <SkillWrapper>
          <SkillName>SUB</SkillName>
          <InputWrapper>
            <InputNumber min={1} max={10} state={currentSubLevel} setState={setCurrentSubLevel} />
            <Arrow />
            <InputNumber min={currentSubLevel} max={10} state={goalSubLevel} setState={setGoalSubLevel} />
          </InputWrapper>
        </SkillWrapper>
      </Wrapper>
      {cost.length !== 0 ? 
        <GoalDetail cost={cost} resetCost={resetCost} />
        : ''
      }
    </>
  )
}

const Title = styled.div`
  color: rgba(167,139,250,1);
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
  gap: 20px;
`

const SkillWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SkillName = styled.div`
  display: flex;
  font-weight: 600;
  font-size: .875rem;
  line-height: 1.25rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  border-radius: 0.25rem;
  margin: 0.5rem;
  background-color: rgba(139,92,246,1);
`

const InputWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const Arrow = styled(MdDoubleArrow)`
`