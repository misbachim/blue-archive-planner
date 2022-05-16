import React from 'react'
import styled from 'styled-components';
import { ACTION } from '../../../../constant/ActionConstant';
import { EXP_ORB } from '../../../../constant/ExpOrbConstant';
import { EXP_REPORT } from '../../../../constant/ExpReportConstant';
import { EXP_REQ_TO_LEVEL } from '../../../../constant/ExpReportReqConstant';
import { ITEM_TYPE } from '../../../../constant/ResourceDataConstant';
import { useMainInventories } from '../../../../contexts/MainInventoryContext';
import { ButtonDone } from '../../../ButtonDone';
import ItemCard from '../../../Card/ItemCard';

function characterExpToExpReport(xp) {
  return Math.ceil(xp/EXP_REPORT.TIER_3)
}

function gearExpToExpOrb(xp) {
  return Math.ceil(xp/EXP_ORB.TIER_3)
}

export function GoalDetail({ cost, resetCost }) {
  const { mainInventories, dispatch } = useMainInventories()

  function onClickDone() {
    cost.forEach(inventory => {
      const main = mainInventories.find(main => inventory.type===main.type 
        && inventory.item===main.item
        && inventory.tier===main.tier)
      if (main === undefined) {
        return
      }
      let goal = inventory.currentGoal
      if (inventory.type===ITEM_TYPE.EXP_REPORT) {
        goal = characterExpToExpReport(goal)
      }
      if (inventory.type===ITEM_TYPE.EXP_ORB) {
        goal = gearExpToExpOrb(goal)
      }

      dispatch({
        type: ACTION.EDIT,
        payload: {
          id: main.id,
          value: main.value - goal
        }
      })
    })
    resetCost()
  }

  return (
    <>
    <Wrapper>
      <Heading>
        GOAL COST
        <ButtonDone onClick={onClickDone}/>
      </Heading>
      <Content>
        {cost.map(props => {
          return <ItemCard key={props.item.concat(props.tier)} {...props} />
        })}
      </Content>
    </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 5px;
  margin-top: 20px;
  font-weight: 600;
`

const Heading = styled.div`
  display: flex;
  gap: 5px;
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`