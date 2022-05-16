import React, { useState } from 'react'
import styled from 'styled-components';
import { MdDoubleArrow } from 'react-icons/md';
import { InputNumber } from './InputNumber';
import { GoalDetail } from './GoalDetail';
import { useMainGoals } from '../../../../contexts/MainGoalContext';
import useUpdateEffect from './../../../../hooks/useUpdateEffect';
import { ACTION } from './../../../../constant/ActionConstant';
import CostUtil from '../../../../util/CostUtil';
import PopupGearLevel, { POPUP_GEAR_TYPE } from './PopupGearLevel';
import Popup from 'reactjs-popup';
import { RESOURCE_TYPE } from '../../../../constant/ResourceDataConstant';
import charData from '../../../../resource/charData.json'
import charGearData from '../../../../resource/charGear.json'


export default function TabGear({ selectedCharacter }) {
  const { mainGoals, dispatch } = useMainGoals()
  const { getGearCost } = CostUtil()
  
  const [currentSlot1Level, setCurrentSlot1Level] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().current.slot1.level : 1)
  const [goalSlot1Level, setGoalSlot1Level] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().goal.slot1.level : 1)
  const [currentSlot1Tier, setCurrentSlot1Tier] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().current.slot1.tier : 0)
  const [goalSlot1Tier, setGoalSlot1Tier] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().goal.slot1.tier : 0)
  
  const [currentSlot2Level, setCurrentSlot2Level] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().current.slot2.level : 1)
  const [goalSlot2Level, setGoalSlot2Level] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().goal.slot2.level : 1)
  const [currentSlot2Tier, setCurrentSlot2Tier] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().current.slot2.tier : 0)
  const [goalSlot2Tier, setGoalSlot2Tier] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().goal.slot2.tier : 0)
  
  const [currentSlot3Level, setCurrentSlot3Level] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().current.slot3.level : 1)
  const [goalSlot3Level, setGoalSlot3Level] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().goal.slot3.level : 1)
  const [currentSlot3Tier, setCurrentSlot3Tier] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().current.slot3.tier : 0)
  const [goalSlot3Tier, setGoalSlot3Tier] = useState(getCharacterGoal() !== undefined ? getCharacterGoal().goal.slot3.tier : 0)
  
  const [cost, setCost] = useState(getGearCost(
    selectedCharacter,
    currentSlot1Level, goalSlot1Level, currentSlot1Tier, goalSlot1Tier,
    currentSlot2Level, goalSlot2Level, currentSlot2Tier, goalSlot2Tier,
    currentSlot3Level, goalSlot3Level, currentSlot3Tier, goalSlot3Tier,))
  
  function getCharacterGoal() {
    return mainGoals.find(e => e.type===RESOURCE_TYPE.GEAR && e.character===selectedCharacter)
  }

  function resetCost() {
    setCurrentSlot1Level(goalSlot1Level)
    setCurrentSlot2Level(goalSlot2Level)
    setCurrentSlot3Level(goalSlot3Level)

    setCurrentSlot1Tier(goalSlot1Tier)
    setCurrentSlot2Tier(goalSlot2Tier)
    setCurrentSlot3Tier(goalSlot3Tier)
  }

  useUpdateEffect(() => {
    if (getCharacterGoal() === undefined) {
      dispatch({
        type: ACTION.ADD,
        payload: {
          type: RESOURCE_TYPE.GEAR,
          character: selectedCharacter,
          current: {
            slot1: {
              level: currentSlot1Level,
              tier: currentSlot1Tier
            },
            slot2: {
              level: currentSlot2Level,
              tier: currentSlot2Tier
            },
            slot3: {
              level: currentSlot3Level,
              tier: currentSlot3Tier
            },
          },
          goal: {
            slot1: {
              level: goalSlot1Level,
              tier: goalSlot1Tier
            },
            slot2: {
              level: goalSlot2Level,
              tier: goalSlot2Tier
            },
            slot3: {
              level: goalSlot3Level,
              tier: goalSlot3Tier
            }
          }
        }
      })
    }
    if (getCharacterGoal() !== undefined) {
      dispatch({
        type: ACTION.EDIT,
        payload: {
          id: getCharacterGoal().id,
          type: RESOURCE_TYPE.GEAR,
          character: selectedCharacter,
          current: {
            slot1: {
              level: currentSlot1Level,
              tier: currentSlot1Tier
            },
            slot2: {
              level: currentSlot2Level,
              tier: currentSlot2Tier
            },
            slot3: {
              level: currentSlot3Level,
              tier: currentSlot3Tier
            },
          },
          goal: {
            slot1: {
              level: goalSlot1Level,
              tier: goalSlot1Tier
            },
            slot2: {
              level: goalSlot2Level,
              tier: goalSlot2Tier
            },
            slot3: {
              level: goalSlot3Level,
              tier: goalSlot3Tier
            }
          }
        }
      })
    }
    setCost(getGearCost(
      selectedCharacter,
      currentSlot1Level, goalSlot1Level, currentSlot1Tier, goalSlot1Tier,
      currentSlot2Level, goalSlot2Level, currentSlot2Tier, goalSlot2Tier,
      currentSlot3Level, goalSlot3Level, currentSlot3Tier, goalSlot3Tier,))
  }, 
  [
    currentSlot1Level, goalSlot1Level, currentSlot1Tier, goalSlot1Tier,
    currentSlot2Level, goalSlot2Level, currentSlot2Tier, goalSlot2Tier,
    currentSlot3Level, goalSlot3Level, currentSlot3Tier, goalSlot3Tier,
  ])
  
  return (
    <>
    <Title>GEAR</Title>
    <Wrapper>
      <GearWrapper>
        <GearName>Firepower Frame</GearName>
        <InputWrapper>
          <Popup
            trigger={open => (
              <ButtonGearLevel >
                <TierDiv>
                  T{currentSlot1Tier+1}
                </TierDiv>
                <LevelDiv $level={currentSlot1Level}>
                  {currentSlot1Level}
                </LevelDiv>
              </ButtonGearLevel>
            )}
            position={['bottom left', 'top left']}
            >
          <PopupGearLevel 
            popupType={POPUP_GEAR_TYPE.CURRENT}
            currentTier={currentSlot1Tier} currentLevel={currentSlot1Level} 
            goalTier={goalSlot1Tier} goalLevel={goalSlot1Level} 
            setCurrentTier={setCurrentSlot1Tier} setCurrentLevel={setCurrentSlot1Level}
            setGoalTier={setGoalSlot1Tier} setGoalLevel={setGoalSlot1Level}
            />
          </Popup>
          <Arrow />
          <Popup
            trigger={open => (
              <ButtonGearLevel >
                <TierDiv>
                  T{goalSlot1Tier+1}
                </TierDiv>
                <LevelDiv $level={goalSlot1Level}>
                  {goalSlot1Level}
                </LevelDiv>
              </ButtonGearLevel>
            )}
            position={['bottom left', 'top left']}
            >
          <PopupGearLevel 
            popupType={POPUP_GEAR_TYPE.GOAL}
            currentTier={currentSlot1Tier} currentLevel={currentSlot1Level} 
            goalTier={goalSlot1Tier} goalLevel={goalSlot1Level} 
            setCurrentTier={setCurrentSlot1Tier} setCurrentLevel={setCurrentSlot1Level}
            setGoalTier={setGoalSlot1Tier} setGoalLevel={setGoalSlot1Level}
            />
          </Popup>
        </InputWrapper>
      </GearWrapper>
      <GearWrapper>
        <GearName>Endurance Frame</GearName>
        <InputWrapper>
          <Popup
            trigger={open => (
              <ButtonGearLevel >
                <TierDiv>
                  T{currentSlot2Tier+1}
                </TierDiv>
                <LevelDiv $level={currentSlot2Level}>
                  {currentSlot2Level}
                </LevelDiv>
              </ButtonGearLevel>
            )}
            position={['bottom left', 'top left']}
            >
          <PopupGearLevel 
            popupType={POPUP_GEAR_TYPE.CURRENT}
            currentTier={currentSlot2Tier} currentLevel={currentSlot2Level} 
            goalTier={goalSlot2Tier} goalLevel={goalSlot2Level} 
            setCurrentTier={setCurrentSlot2Tier} setCurrentLevel={setCurrentSlot2Level}
            setGoalTier={setGoalSlot2Tier} setGoalLevel={setGoalSlot2Level}
            />
          </Popup>
          <Arrow />
          <Popup
            trigger={open => (
              <ButtonGearLevel >
                <TierDiv>
                  T{goalSlot2Tier+1}
                </TierDiv>
                <LevelDiv $level={goalSlot2Level}>
                  {goalSlot2Level}
                </LevelDiv>
              </ButtonGearLevel>
            )}
            position={['bottom left', 'top left']}
            >
          <PopupGearLevel 
            popupType={POPUP_GEAR_TYPE.GOAL}
            currentTier={currentSlot2Tier} currentLevel={currentSlot2Level} 
            goalTier={goalSlot2Tier} goalLevel={goalSlot2Level} 
            setCurrentTier={setCurrentSlot2Tier} setCurrentLevel={setCurrentSlot2Level}
            setGoalTier={setGoalSlot2Tier} setGoalLevel={setGoalSlot2Level}
            />
          </Popup>
        </InputWrapper>
      </GearWrapper>
      <GearWrapper>
        <GearName>Auxiliary Frame</GearName>
        <InputWrapper>
          <Popup
            trigger={open => (
              <ButtonGearLevel >
                <TierDiv>
                  T{currentSlot3Tier+1}
                </TierDiv>
                <LevelDiv $level={currentSlot3Level}>
                  {currentSlot3Level}
                </LevelDiv>
              </ButtonGearLevel>
            )}
            position={['bottom left', 'top left']}
            >
          <PopupGearLevel 
            popupType={POPUP_GEAR_TYPE.CURRENT}
            currentTier={currentSlot3Tier} currentLevel={currentSlot3Level} 
            goalTier={goalSlot3Tier} goalLevel={goalSlot3Level} 
            setCurrentTier={setCurrentSlot3Tier} setCurrentLevel={setCurrentSlot3Level}
            setGoalTier={setGoalSlot3Tier} setGoalLevel={setGoalSlot3Level}
            />
          </Popup>
          <Arrow />
          <Popup
            trigger={open => (
              <ButtonGearLevel >
                <TierDiv>
                  T{goalSlot3Tier+1}
                </TierDiv>
                <LevelDiv $level={goalSlot3Level}>
                  {goalSlot3Level}
                </LevelDiv>
              </ButtonGearLevel>
            )}
            position={['bottom left', 'top left']}
            >
          <PopupGearLevel 
            popupType={POPUP_GEAR_TYPE.GOAL}
            currentTier={currentSlot3Tier} currentLevel={currentSlot3Level} 
            goalTier={goalSlot3Tier} goalLevel={goalSlot3Level} 
            setCurrentTier={setCurrentSlot3Tier} setCurrentLevel={setCurrentSlot3Level}
            setGoalTier={setGoalSlot3Tier} setGoalLevel={setGoalSlot3Level}
            />
          </Popup>
        </InputWrapper>
      </GearWrapper>
    </Wrapper>
    {cost.length !== 0 ? 
      <GoalDetail cost={cost} resetCost={resetCost} />
      : ''
    }
    </>
  )
}

const Title = styled.div`
  color: rgba(217,70,239,1);
  font-weight: 600;
  font-size: .875rem;
  line-height: 1.25rem;
  text-align: center;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 0.25rem;
  border-radius: 3px;
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
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const GearWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const GearName = styled.div`
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
  align-items: center;
  gap: 5px;
`

const Arrow = styled(MdDoubleArrow)`
`
const ButtonGearLevel = styled.button`
  display: flex;
  width: 4.5rem;
  font-weight: 600;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: rgba(100,116,139,1);
  border-radius: 0.25rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-color: transparent;
`

const TierDiv = styled.div`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
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