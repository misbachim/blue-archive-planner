import React from 'react'
import { IconContext } from 'react-icons';
import { AiFillCheckCircle } from 'react-icons/ai';
import { HiFlag } from 'react-icons/hi';
import Popup from "reactjs-popup";
import styled from 'styled-components';
import { EXP_ORB } from '../../constant/ExpOrbConstant';
import { EXP_REPORT } from '../../constant/ExpReportConstant';
import { EXP_REQ_TO_LEVEL } from '../../constant/ExpReportReqConstant';
import { ITEM_TYPE } from '../../constant/ResourceDataConstant';
import { useMainGoals } from '../../contexts/MainGoalContext';
import { useMainInventories } from '../../contexts/MainInventoryContext';
import CostUtil from '../../util/CostUtil';
import { abbreviateNumber } from '../../util/NumberUtil';
import InputCreditPoint from '../Input/InputCreditPoint';
import InputExpOrb from '../Input/InputExpOrb';
import InputExpReport from '../Input/InputExpReport';
import InputItem from '../Input/InputItem';
import { getImage, getName } from './../../util/ResourceUtil';

const COMPLETION = {
  NONE: 'NONE',
  CURRENT: 'CURRENT',
  TOTAL: 'TOTAL'
}

function characterExpToExpReport(xp) {
  return Math.ceil(xp/EXP_REPORT.TIER_3)
}

function gearExpToExpOrb(xp) {
  return Math.ceil(xp/EXP_ORB.TIER_3)
}

export default function ItemCard({ currentGoal, type, item, tier }) {
  const { mainInventories, dispatch } = useMainInventories()
  const { getTotalCost } = CostUtil()

  const totalCost = getTotalCost()
  let totalGoal = totalCost.find(tc => tc.type===type && tc.item===item && tc.tier===tier).totalGoal

  const name = getName({ type: type, item: item, tier: tier })
  const image = getImage({ type: type, item: item, tier: tier })

  const main = mainInventories.find(main => type===main.type 
    && item===main.item
    && tier===main.tier)
    
  let value = main === undefined ? 0 : main.value

  let completion = COMPLETION.NONE
  if (value >= totalGoal) {
    completion = COMPLETION.TOTAL
  } else
  if (value >= currentGoal) {
    completion = COMPLETION.CURRENT
  }
  
  if (type===ITEM_TYPE.EXP_REPORT) {
    const tier0 = mainInventories.find(i => i.type===ITEM_TYPE.EXP_REPORT && i.tier===0)
    const tier1 = mainInventories.find(i => i.type===ITEM_TYPE.EXP_REPORT && i.tier===1)
    const tier2 = mainInventories.find(i => i.type===ITEM_TYPE.EXP_REPORT && i.tier===2)
    const tier3 = mainInventories.find(i => i.type===ITEM_TYPE.EXP_REPORT && i.tier===3)
    if (tier0 !== undefined) {
      value = value + tier0.value*EXP_REPORT.TIER_0
    }
    if (tier1 !== undefined) {
      value = value + tier1.value*EXP_REPORT.TIER_1
    } 
    if (tier2 !== undefined) {
      value = value + tier2.value*EXP_REPORT.TIER_2
    }
    if (tier3 !== undefined) {
      value = value + tier3.value*EXP_REPORT.TIER_3
    }

    if (value >= currentGoal) {
      completion = COMPLETION.CURRENT
    }
    if (value >= totalGoal) {
      completion = COMPLETION.TOTAL
    }
    currentGoal = characterExpToExpReport(currentGoal)
    totalGoal = characterExpToExpReport(totalGoal)
  }

  if (type===ITEM_TYPE.EXP_ORB) {
    const tier0 = mainInventories.find(i => i.type===ITEM_TYPE.EXP_ORB && i.tier===0)
    const tier1 = mainInventories.find(i => i.type===ITEM_TYPE.EXP_ORB && i.tier===1)
    const tier2 = mainInventories.find(i => i.type===ITEM_TYPE.EXP_ORB && i.tier===2)
    const tier3 = mainInventories.find(i => i.type===ITEM_TYPE.EXP_ORB && i.tier===3)
    if (tier0 !== undefined) 
      value = value + tier0.value*EXP_ORB.TIER_0
    if (tier1 !== undefined) 
      value = value + tier1.value*EXP_ORB.TIER_1
    if (tier2 !== undefined) 
      value = value + tier2.value*EXP_ORB.TIER_2
    if (tier3 !== undefined) 
      value = value + tier3.value*EXP_ORB.TIER_3

    if (value >= currentGoal) {
      completion = COMPLETION.CURRENT
    }
    if (value >= totalGoal) {
      completion = COMPLETION.TOTAL
    }
    currentGoal = gearExpToExpOrb(currentGoal)
    totalGoal = gearExpToExpOrb(totalGoal)
  }

  function goalDetail() {
    return (
      <GoalTotal $completion={completion}>
        <IconContext.Provider
          value={{ color: 'white', size: '1rem' }}
        >
          {completion===COMPLETION.TOTAL ? 
            <AiFillCheckCircle /> : 
            <HiFlag />
          }
        </IconContext.Provider>
        {abbreviateNumber(totalGoal)}
      </GoalTotal>
    )
  }

  return (
    <>
    <Popup
      trigger={open => (
        <Button>
          <Popup
            trigger={open => (
              <ItemWrapper tier={tier}>
                <StyledImg
                  src={image}
                  alt={item}
                />
              </ItemWrapper>
            )}
            on={'hover'}
            position={'top center'}
            arrowStyle={{backgroundColor: 'rgba(0,0,0, 0.5)'}}
          >
            <Tooltip>{name}</Tooltip>
          </Popup>
          {goalDetail()}
        </Button>
      )}
      closeOnDocumentClick
      arrow={false}
      offsetY={15}
      position={['bottom center', 'top center', ]}
    >
      <Content>
        <DetailTextWrapper>
          <CurrentGoalText>
            {abbreviateNumber(currentGoal)} needed for this goal
          </CurrentGoalText>
          <TotalGoalText>
            {abbreviateNumber(totalGoal)} needed for all goals
          </TotalGoalText>
          <StatusGoalText $completion={completion}>
          {completion===COMPLETION.TOTAL ? 
            `You have the amount needed for all goals` :
            completion===COMPLETION.CURRENT ? 
              `You have the amount needed for this goal`:
              `You don't have enough`
          }
          </StatusGoalText>
        </DetailTextWrapper>
        <DetailItemWrapper>
          {type===ITEM_TYPE.CREDIT ? 
            <InputCreditPoint dispatch={dispatch}/> :
            type===ITEM_TYPE.EXP_REPORT ? 
              <InputExpReport dispatch={dispatch}/> :
              type===ITEM_TYPE.EXP_ORB ? 
                <InputExpOrb dispatch={dispatch}/> :
                <InputItem item={item} type={type} imgSrc={image} tier={tier} dispatch={dispatch}/>
          }
        </DetailItemWrapper>
      </Content>
    </Popup>
    </>
  )
}

const Button = styled.button`
  border: transparent;
  border-radius: 4px 4px 0px 0px;
  cursor: pointer;
  background-color: transparent;
`

const ItemWrapper = styled.div`
  display: flex;
  ${props => props.tier===0 && 'background-color: rgba(190, 196, 201, 0.6);'}
  ${props => props.tier===1 && 'background-color: rgba(122, 185, 255, 0.6);'}
  ${props => props.tier===2 && 'background-color: rgba(236, 160, 74, 0.6);'}
  ${props => props.tier===3 && 'background-color: rgba(162, 105, 255, 0.6);'}
  ${props => props.tier===4 && 'background-color: rgba(255, 20, 147, 0.6);'}
  ${props => props.tier===5 && 'background-color: rgba(221, 17, 51, 0.6);'}
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 4px 4px 0px 0px;
`

const StyledImg = styled.img`
  object-position: center;
  object-fit: contain;
  width: 100%;
`

const GoalTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => {
    if (props.$completion === COMPLETION.TOTAL) {
      return `background-color: rgba(4,120,87,1);`
    }
    if (props.$completion === COMPLETION.CURRENT) {
      return `background-color: rgba(161,98,7,1);`
    }
    return `background-color: rgba(190,18,60,1);`
  }}
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: .75rem;
  line-height: 1rem;
  font-weight: 600;
  border-radius: 0px 0px 4px 4px;
  gap: 3px;
`

const Content = styled.div`
  border-radius: 0.375rem!important;
  border: 1px solid #475569!important;
  background: #334155!important;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -0.75rem!important;
  padding: 0.75rem!important;
`

const Tooltip = styled.div`
  background-color: rgba(0,0,0, 0.5);
  padding: 5px;
`

const DetailTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.25rem;
  width: 12rem;
  margin-bottom: 0.5rem;
`

const CurrentGoalText = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: .75rem;
  line-height: 1rem;
  font-weight: 600;
`

const TotalGoalText = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: .75rem;
  line-height: 1rem;
  font-weight: 600;
`

const StatusGoalText = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: .75rem;
  line-height: 1;
  font-weight: 600;
  ${(props) => {
    if (props.$completion === COMPLETION.TOTAL) {
      return `background-color: rgba(4,120,87,.75);`
    }
    if (props.$completion === COMPLETION.CURRENT) {
      return `background-color: rgba(161,98,7,.75);`
    }
    return `background-color: rgba(190,18,60,.75);`
  }}
  border-radius: 0.5rem;
  text-align: center;
  align-items: center;
  height: 2rem;
  display: flex;
`

const DetailItemWrapper = styled.div`
  
`