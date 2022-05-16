import React from 'react'
import styled from 'styled-components';
import { useMainGoals } from '../../contexts/MainGoalContext';
import { useMainInventories } from '../../contexts/MainInventoryContext';
import TagGoal from '../TagGoal';
import { Input } from './Input';
import { ACTION } from './../../constant/ActionConstant';
import { ITEM_TYPE } from '../../constant/ResourceDataConstant';

export default function InputCreditPoint() {
  const { mainGoals, addCharacterMainGoal } = useMainGoals()
  const { mainInventories, dispatch } = useMainInventories()

  const onAddInventory = (e) => {
    const value = e.target.value;
    if (value >= 0 || value === '') {
      dispatch({
        type: ACTION.ADD, 
        payload: {
          type: ITEM_TYPE.CREDIT,
          item: ITEM_TYPE.CREDIT,
          tier: 1,
          value: value === '' ? 0 : value
        }
      })
    }
  };
  
  const onEditInventory = (e, id) => {
    const value = e.target.value;
    if (value >= 0 || value === '') {
      dispatch({
        type: ACTION.EDIT, 
        payload: {
          id: id,
          value: value === '' ? 0 : value
        }
      })
    }
  }

  function handleInventory() {
    const inventory = mainInventories.find(
      i => i.type===ITEM_TYPE.CREDIT && i.item===ITEM_TYPE.CREDIT && i.tier===1)
  if (inventory === undefined)  
    return <Input type='text' size='md' onChange={onAddInventory} /> 
  return <Input id={inventory.id} type='text' size='md' onChange={(e) => onEditInventory(e, inventory.id)} value={inventory.value} />
  }

  return (
    <>
    <Wrapper>
      <CreditPointWrapper>
        <ImageWrapper>
          <StyledImg
            src='https://static.wikia.nocookie.net/blue-archive/images/1/10/Gold.png'
            alt='Credit Point'
          />
        </ImageWrapper>
        <GoalWrapper>
          <TagGoal type={ITEM_TYPE.CREDIT} item={ITEM_TYPE.CREDIT} tier={1}/>
        </GoalWrapper>
        {handleInventory()}
      </CreditPointWrapper>
    </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 3.5rem;
  width: 100%;
  flex-wrap: wrap;
  gap: 5px;
`

const CreditPointWrapper = styled.div`
  display: flex;
  height: 3.5rem;
  width: 15rem;
  background-color: rgba(71,85,105,1);
  border-radius: 4px;
`

const ImageWrapper = styled.div`
  display: flex;
  background-color: lightblue;
  width: 3.5rem;
  border-radius: 4px 0px 0px 4px;
  background-color: rgba(122, 185, 255, 0.6);
`

const GoalWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  gap: 3px;
`

const StyledImg = styled.img`
  object-position: center;
  object-fit: contain;
  width: 3.5rem;
`
