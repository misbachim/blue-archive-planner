import React from 'react'
import Popup from "reactjs-popup";
import styled from 'styled-components';
import { EXP_ORB } from '../../constant/ExpOrbConstant';
import { EXP_REPORT } from '../../constant/ExpReportConstant';
import { ITEM_TYPE } from '../../constant/ResourceDataConstant';
import { useMainInventories } from '../../contexts/MainInventoryContext';
import CostUtil from '../../util/CostUtil';
import { abbreviateNumber } from '../../util/NumberUtil';
import InputCreditPoint from '../../components/Input/InputCreditPoint';
import InputExpOrb from '../../components/Input/InputExpOrb';
import InputExpReport from '../../components/Input/InputExpReport';
import InputItem from '../../components/Input/InputItem';
import { getImage, getName } from './../../util/ResourceUtil';
import { HiCheck } from 'react-icons/hi';
import { IconContext } from 'react-icons';

function characterExpToExpReport(xp) {
  return Math.ceil(xp/EXP_REPORT.TIER_3)
}

function gearExpToExpOrb(xp) {
  return Math.ceil(xp/EXP_ORB.TIER_3)
}

const COMPLETION = {
  INCOMPLETE: 'INCOMPLETE',
  COMPLETE: 'COMPLETE'
}

export default function ItemCard({ type, item, tier, chance }) {
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

  let completion = COMPLETION.INCOMPLETE
  if (value >= totalGoal) {
    completion = COMPLETION.COMPLETE
  } else
  
  if (type===ITEM_TYPE.EXP_REPORT) {
    totalGoal = characterExpToExpReport(totalGoal)
  }

  if (type===ITEM_TYPE.EXP_ORB) {
    totalGoal = gearExpToExpOrb(totalGoal)
  }

  return (
    <>
    <Popup
      trigger={open => (
        <Button tier={tier}>
          <Popup
            trigger={open => (
              <>
                <StyledImg
                  src={image}
                  alt={item}
                />
                <ChanceLabel>
                  {chance*100}%
                </ChanceLabel>
                {completion===COMPLETION.COMPLETE ? '' :
                  <GoalTotal>
                    {abbreviateNumber(totalGoal)}
                  </GoalTotal>
                }
                {completion!==COMPLETION.COMPLETE ? '' :
                  <CompleteSign>
                    <IconContext.Provider
                      value={{ color: 'white', size: '1rem' }}
                    >
                      <HiCheck />
                    </IconContext.Provider>
                  </CompleteSign>
                }
              </>
            )}
            on={'hover'}
            position={'top center'}
            arrowStyle={{backgroundColor: 'rgba(0,0,0, 0.5)'}}
          >
            <Tooltip>{name}</Tooltip>
          </Popup>
        </Button>
      )}
      closeOnDocumentClick
      arrow={false}
      offsetY={15}
      position={['bottom center', 'top center', ]}
    >
      <Content>
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
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: transparent;
  overflow: hidden;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  position: relative;
  
  ${props => props.tier===0 && 'background-color: rgba(190, 196, 201, 0.6);'}
  ${props => props.tier===1 && 'background-color: rgba(122, 185, 255, 0.6);'}
  ${props => props.tier===2 && 'background-color: rgba(236, 160, 74, 0.6);'}
  ${props => props.tier===3 && 'background-color: rgba(162, 105, 255, 0.6);'}
  ${props => props.tier===4 && 'background-color: rgba(255, 20, 147, 0.6);'}
  ${props => props.tier===5 && 'background-color: rgba(221, 17, 51, 0.6);'}
`

const StyledImg = styled.img`
  object-position: center;
  object-fit: contain;
  width: 100%;
  height: 100%;
`

const ChanceLabel = styled.span`
  font-size: .75rem;
  line-height: 1rem;
  font-style: italic;
  position: absolute;
  background-color: rgb(33, 37, 41);
  border-bottom-left-radius: 0.25rem;
  top: 0;
  right: 0;
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
`

const GoalTotal = styled.div`
  font-size: .75rem;
  line-height: 1rem;
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  background-color: rgba(100,116,139,1);
  border-top-left-radius: 0.25rem;
  right: 0;
  bottom: 0;
  position: absolute;
`
const CompleteSign = styled.div`
  opacity: .75;
  background-color: rgba(51,65,85,1);
  justify-content: center;
  align-items: center;
  display: flex;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  position: absolute;
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

const DetailItemWrapper = styled.div`
  
`