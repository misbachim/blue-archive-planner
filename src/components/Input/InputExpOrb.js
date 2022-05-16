import React from 'react'
import styled from 'styled-components';
import { useMainGoals } from '../../contexts/MainGoalContext';
import { useMainInventories } from '../../contexts/MainInventoryContext';

import TagGoal from '../TagGoal';
import { Input } from './Input';
import { ACTION } from './../../constant/ActionConstant';
import { ITEM_TYPE } from '../../constant/ResourceDataConstant';

export default function InputExpOrb() {
  const { mainGoals, addCharacterMainGoal } = useMainGoals()
  const { mainInventories, dispatch } = useMainInventories()

  const onChange = (e, id, tier) => {
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
            type: ITEM_TYPE.EXP_ORB,
            item: ITEM_TYPE.EXP_ORB,
            tier: tier,
            value: value === '' ? 0 : value
          }
        })
      }
    }
  };

  function getExpOrbId(tier) {
    const inventory = mainInventories.find(
        e => e.type===ITEM_TYPE.EXP_ORB && e.item===ITEM_TYPE.EXP_ORB && e.tier===tier)
    return inventory === undefined ? '' : inventory.id
  }

  function getExpOrbValue(tier) {
    const inventory = mainInventories.find(
        e => e.type===ITEM_TYPE.EXP_ORB && e.item===ITEM_TYPE.EXP_ORB && e.tier===tier)
    return inventory === undefined ? '' : inventory.value
  }

  return (
    <>
    <Wrapper>
      <ExpOrbWrapper size={'normal'}>
        <ImageWrapper tier={3}>
          <StyledImg
            src='https://static.wikia.nocookie.net/blue-archive/images/6/67/Exp_Orb_3.png'
            alt='Exp Orb 3'
          />
        </ImageWrapper>
        <GoalWrapper size={'normal'}>
          <TagGoal type={ITEM_TYPE.EXP_ORB} item={ITEM_TYPE.EXP_ORB} tier={3}/>
        </GoalWrapper>
        <Input onChange={(e) => onChange(e, getExpOrbId(3), 3)} value={getExpOrbValue(3)}  border={['tr', 'br']}  />
      </ExpOrbWrapper>
      <ExpOrbWrapper size={'small'}>
        <ImageWrapper tier={2}>
          <StyledImg
            src='https://static.wikia.nocookie.net/blue-archive/images/d/d1/Exp_Orb_2.png'
            alt='Exp Orb 2'
          />
        </ImageWrapper>
        <GoalWrapper size={'small'}>
          <TagGoal type={ITEM_TYPE.EXP_ORB} item={ITEM_TYPE.EXP_ORB} tier={2}/>
        </GoalWrapper>
        <Input onChange={(e) => onChange(e, getExpOrbId(2), 2)} value={getExpOrbValue(2)} border={['tr', 'br']}  />
      </ExpOrbWrapper>
      <ExpOrbWrapper size={'small'}>
        <ImageWrapper tier={1}>
          <StyledImg
            src='https://static.wikia.nocookie.net/blue-archive/images/4/43/Exp_Orb_1.png'
            alt='Exp Orb 1'
          />
        </ImageWrapper>
        <GoalWrapper size={'small'}>
          <TagGoal type={ITEM_TYPE.EXP_ORB} item={ITEM_TYPE.EXP_ORB} tier={1}/>
        </GoalWrapper>
        <Input onChange={(e) => onChange(e, getExpOrbId(1), 1)} value={getExpOrbValue(1)} border={['tr', 'br']}  />
      </ExpOrbWrapper>
      <ExpOrbWrapper size={'small'}>
        <ImageWrapper tier={0}>
          <StyledImg
            src='https://static.wikia.nocookie.net/blue-archive/images/b/b9/Exp_Orb_0.png'
            alt='Exp Orb 0'
          />
        </ImageWrapper>
        <GoalWrapper size={'small'}>
          <TagGoal type={ITEM_TYPE.EXP_ORB} item={ITEM_TYPE.EXP_ORB} tier={0}/>
        </GoalWrapper>
        <Input onChange={(e) => onChange(e, getExpOrbId(0), 0)} value={getExpOrbValue(0)} border={['tr', 'br']}  />
      </ExpOrbWrapper>
    </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 5px;
`

const ExpOrbWrapper = styled.div`
  display: flex;
  height: 3.5rem;
  background-color: rgba(71,85,105,1);
  border-radius: 4px;
  ${props => {
    if (props.size==="full") {
      return `width: 100%`
    } else if (props.size==="normal") {
      return 'width: 15rem;'
    } else if (props.size==="small") {
      return 'max-width: 15rem;'
    }
  }}
`

const ImageWrapper = styled.div`
  display: flex;
  background-color: lightblue;
  width: 3.5rem;
  border-radius: 4px 0px 0px 4px;
  ${props => props.tier===0 && 'background-color: rgba(190, 196, 201, 0.6);'}
  ${props => props.tier===1 && 'background-color: rgba(122, 185, 255, 0.6);'}
  ${props => props.tier===2 && 'background-color: rgba(236, 160, 74, 0.6);'}
  ${props => props.tier===3 && 'background-color: rgba(162, 105, 255, 0.6);'}
`

const GoalWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  gap: 3px;
  ${props => {
    if (props.size==="small") {
      return `display: none;`
    }}
  }
`

const StyledImg = styled.img`
  object-position: center;
  object-fit: contain;
  width: 3.5rem;
`
