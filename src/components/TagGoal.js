import React from 'react'
import styled from 'styled-components';
import { HiFlag, HiExclamationCircle } from 'react-icons/hi'
import { useMainInventories } from './../contexts/MainInventoryContext';
import CostUtil from '../util/CostUtil';
import { ITEM_TYPE } from '../constant/ResourceDataConstant';
import { EXP_REPORT } from '../constant/ExpReportConstant';
import { EXP_ORB } from '../constant/ExpOrbConstant';
import { IconContext } from 'react-icons';
import { abbreviateNumber } from './../util/NumberUtil';

const COMPLETION = {
  NONE: 'NONE',
  INCOMPLETE: 'INCOMPLETE',
  COMPLETE: 'COMPLETE',
}

function characterExpToExpReport(xp) {
  return Math.ceil(xp/EXP_REPORT.TIER_3)
}

function gearExpToExpOrb(xp) {
  return Math.ceil(xp/EXP_ORB.TIER_3)
}

export default function TagGoal({ type, item, tier }) {
  const { mainInventories } = useMainInventories()
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

    if (totalGoal !== 0) {
      completion = COMPLETION.INCOMPLETE
    }
    if (value >= totalGoal) {
      completion = COMPLETION.COMPLETE
    }
    if (totalGoal === 0) {
      completion = COMPLETION.NONE
    }
  
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

    if (totalGoal !== 0) {
      completion = COMPLETION.INCOMPLETE
    }
    if (value >= totalGoal) {
      completion = COMPLETION.COMPLETE
    }
    if (totalGoal === 0) {
      completion = COMPLETION.NONE
    }
    
    totalGoal = gearExpToExpOrb(totalGoal)
  }

  return (
    <>
    {completion !== COMPLETION.INCOMPLETE ? '' :
      <NeedTag>
        <IconContext.Provider
          value={{ color: 'white', size: '1rem' }}
        >
          <HiFlag />
        </IconContext.Provider>
        {abbreviateNumber(totalGoal)}
      </NeedTag>
    }
    <MissingTag $completion={completion}>
      <IconContext.Provider
        value={{ color: 'white', size: '1rem' }}
      >
        <HiExclamationCircle />
      </IconContext.Provider>
      {abbreviateNumber(totalGoal - value < 0 ? totalGoal 
                        : totalGoal - value)}
    </MissingTag>
    </>
  )
}

const Tag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(251,113,133,1);
  border-radius: 5px;
  padding: 1px;
  font-size: .75rem;
  font-weight: 600;
`

const NeedTag = styled(Tag)`
`

const MissingTag = styled(Tag)`
  ${(props) => {
    if (props.$completion === COMPLETION.COMPLETE) {
      return `background-color: rgba(16,185,129,1);`
    }
    if (props.$completion === COMPLETION.INCOMPLETE) {
      return `background-color: rgba(251,113,133,1);`
    }
    return `
        background-color: rgba(100,116,139,1);
        opacity: .25;
      `
  }}
`
