import React from 'react'
import styled from 'styled-components';
import { Input } from './Input';
import { HiFlag, HiCheckCircle } from 'react-icons/hi'
import { useMainGoals } from '../../contexts/MainGoalContext';
import { useMainInventories } from '../../contexts/MainInventoryContext';
import { ACTION } from './../../constant/ActionConstant';
import CostUtil from '../../util/CostUtil';
import { IconContext } from 'react-icons';
import { AiFillCheckCircle } from 'react-icons/ai';

const COMPLETION = {
  NONE: 'NONE',
  INCOMPLETE: 'INCOMPLETE',
  COMPLETE: 'COMPLETE',
}

export default function InputItem({ item, type, imgSrc, tier }) {
  const { mainInventories, dispatch } = useMainInventories()
  const { getTotalCost } = CostUtil()

  const totalCost = getTotalCost()
  let foundTotalGoal = totalCost.find(tc => tc.type===type && tc.item===item && tc.tier===tier)
  let totalGoal = foundTotalGoal === undefined ? 0 : foundTotalGoal.totalGoal

  const main = mainInventories.find(main => type===main.type 
    && item===main.item
    && tier===main.tier)
    
  let value = main === undefined ? 0 : main.value

  let completion = COMPLETION.NONE
  if (totalGoal !== 0) {
    completion = COMPLETION.INCOMPLETE
  }
  if (value >= totalGoal) {
    completion = COMPLETION.COMPLETE
  }
  if (totalGoal === 0) {
    completion = COMPLETION.NONE
  }

  const onChange = (e, id) => {

    const value = e.target.value;
    if (value >= 0 || value === '') {
      if (id !== undefined && id !== '') {
        dispatch({
          type: ACTION.EDIT, 
          payload: {
            id: id,
            value: value === '' ? 0 : value
          }
        })
      } else {
        dispatch({
          type: ACTION.ADD, 
          payload: {
            type: type,
            item: item,
            tier: tier,
            value: value === '' ? 0 : value
          }
        })
      }
    }
  };

  function getItemId() {
    const inventory = mainInventories.find(
      e => e.type===type && e.item===item && e.tier===tier)
    return inventory === undefined ? '' : inventory.id
  }

  function getItemValue() {
    const inventory = mainInventories.find(
        e => e.type===type && e.item===item && e.tier===tier)
    return inventory === undefined ? '' : inventory.value
  }

  return (
    <>
    <Wrapper $completion={completion} >
        <ImageWrapper tier={tier}>
          <StyledImg
            src={imgSrc}
            alt={item}
          />
          {completion !== COMPLETION.INCOMPLETE ? '' :
            <MissingWrapper>
              {totalGoal - value < 0 ? totalGoal 
                            : totalGoal - value}
            </MissingWrapper>
          }
        </ImageWrapper>
        <GoalWrapper $completion={completion}>
          <IconContext.Provider
            value={{ color: 'white', size: '1rem' }}
          >
            {completion === COMPLETION.INCOMPLETE ? 
              <HiFlag /> :
              <AiFillCheckCircle />
            }
          </IconContext.Provider>
          {totalGoal}
        </GoalWrapper>
        <Input type="number" border={[ 'bl', 'br' ]} isPadding={true}
          onChange={(e) => onChange(e, getItemId())}
          value={getItemValue()}
        />
    </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 4rem;
  ${(props) => {
    if (props.$completion === COMPLETION.NONE) {
      return `opacity: .5;`
    }
  }}
`

const MissingWrapper = styled.div`
  display: flex;
  background-color: rgba(251,113,133,1);
  border-radius: 9999px;
  font-weight: 600;
  font-size: .75rem;
  align-items: flex-end;
  margin: 0.25rem;
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  right: 0;
  top: 0;
  position: absolute;
`

const ImageWrapper = styled.div`
  display: flex;
  ${props => props.tier===0 && 'background-color: rgba(190, 196, 201, 0.6);'}
  ${props => props.tier===1 && 'background-color: rgba(122, 185, 255, 0.6);'}
  ${props => props.tier===2 && 'background-color: rgba(236, 160, 74, 0.6);'}
  ${props => props.tier===3 && 'background-color: rgba(162, 105, 255, 0.6);'}
  ${props => props.tier===4 && 'background-color: rgba(255, 20, 147, 0.6);'}
  ${props => props.tier===5 && 'background-color: rgba(221, 17, 51, 0.6);'}
  width: 100%;
  border-radius: 4px 4px 0px 0px;
`

const GoalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-weight: 600;
  padding: 5px;
  gap: 3px;
  ${(props) => {
    if (props.$completion === COMPLETION.COMPLETE) {
      return `background-color: rgba(16,185,129,1);`
    }
    if (props.$completion === COMPLETION.INCOMPLETE) {
      return `background-color: rgba(251,113,133,1);`
    }
    return `
        background-color: rgba(100,116,139,1);
        opacity: .5;
      `
  }}
`

const StyledImg = styled.img`
  object-position: center;
  object-fit: contain;
  width: 100%;
`
