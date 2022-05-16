import React from 'react'
import styled from 'styled-components';
import InputCreditPoint from '../components/Input/InputCreditPoint';
import InputExpReport from '../components/Input/InputExpReport';
import InputExpOrb from '../components/Input/InputExpOrb';
import InputItem from './../components/Input/InputItem';
import artiData from '../resource/artidata.json'
import bludiskData from '../resource/bludiskdata.json'
import skillbookData from '../resource/skillbookdata.json'
import gearData from '../resource/gearData.json'
import { useMainInventories } from './../contexts/MainInventoryContext';
import { ITEM_TYPE, RESOURCE_TYPE } from '../constant/ResourceDataConstant';

export default function Inventory() {
  const { dispatch } = useMainInventories()

  return (
    <>
        <Header>Inventory</Header>
        <Wrapper>
          <InputCreditPoint dispatch={dispatch} />
          <InputExpReport dispatch={dispatch} />
          <InputExpOrb dispatch={dispatch} />
        </Wrapper>
        <Bar />
        <Wrapper>
          {artiData.map((e) => {
            return (
              <InputItem 
                name={e.name} 
                item={e.item} 
                type={ITEM_TYPE.ARTIFACT} 
                imgSrc={e.image} 
                tier={e.tier}
                dispatch={dispatch}
              />
            )
            })
          }
          {bludiskData.map((e) => {
            return (
              <InputItem 
                name={e.name} 
                item={e.item} 
                type={ITEM_TYPE.BLURAY_DISK} 
                imgSrc={e.image} 
                tier={e.tier}
                dispatch={dispatch}
              />
            )
            })
          }
          {skillbookData.map((e) => {
            return (
              <InputItem 
                name={e.name} 
                item={e.item} 
                type={ITEM_TYPE.SKILL_BOOK} 
                imgSrc={e.image} 
                tier={e.tier}
                dispatch={dispatch}
              />
            )
            })
          }
          {gearData.map((e) => {
            return (
              <InputItem 
                name={e.name} 
                item={e.item} 
                type={RESOURCE_TYPE.GEAR} 
                imgSrc={e.image} 
                tier={e.tier}
                dispatch={dispatch}
              />
            )
            })
          }
        </Wrapper>
    </>
  )
}

const Header = styled.h1`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
`

const Bar = styled.div`
  border-radius: 9999px;
  min-height: 0.25rem;
  width: 100%;
  margin-top: 1rem;
  background-color: rgba(100,116,139,.25);
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 1rem;
`
