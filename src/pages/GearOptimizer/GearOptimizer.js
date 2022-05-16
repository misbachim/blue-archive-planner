import React from 'react'
import styled from 'styled-components';
import { RESOURCE_TYPE } from '../../constant/ResourceDataConstant';
import ItemCard from './ItemCard';
import GearOptimizerUtil from '../../util/GearOptimizerUtil';
import { getImage } from '../../util/ResourceUtil';
import useModal from './../../hooks/useModal';
import { Modal } from './../../components/Modal/Modal';

export default function GearOptimizer() {
  const { isShowing, toggle, selectedCharacter, setSelectedCharacter } = useModal(null)
  
  const { getOptimizeStageData } = GearOptimizerUtil()

  function openModalCharacter(character) {
    setSelectedCharacter(character)
    toggle()
  }

  return (
    <>
    <Header>
      Gear Optimization
    </Header>
    <Grid>
      {getOptimizeStageData().map(stage => {
        return ( 
          <MissionCard key={stage.tage}>
            <MissionCardHeader>
              <MissionName>
                {stage.stage}
              </MissionName>
            </MissionCardHeader>
            <ItemWrapper>
              {stage.drops.map(drop => {
                return (
                  <ItemCard key={drop.item.concat(drop.tier)} type={drop.type} item={drop.item} tier={drop.tier} chance={drop.chance}/>
                )
              })}
            </ItemWrapper>
            <CharacterWrapper>
              {stage.characters.map(character => {
                return (
                  <Character key={character} onClick={() => openModalCharacter(character)}>
                    <CharacterImage src={getImage({ type: RESOURCE_TYPE.CHARACTER, character: character})}/>
                  </Character>
                )
              })}
            </CharacterWrapper>
          </MissionCard>
        )
      })}
    </Grid>
    <Modal showModal={isShowing} setShowModal={toggle} selectedCharacter={selectedCharacter} setSelectedCharacter={setSelectedCharacter}/>
    </>
  )
}

const Header = styled.h1`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
`

const Grid = styled.div`
  margin-top: 1rem;
  
  --grid-layout-gap: 10px;
  --grid-column-count: 8; /* This gets overridden by an inline style. */
  --grid-item--min-width: 300px; /* This gets overridden by an inline style. */
  
  /**
   * Calculated values.
   */
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr));
  grid-gap: var(--grid-layout-gap);
`

const MissionCard = styled.div`
  box-shadow: 0 0 transparent,
      0 0 transparent,
      0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);
  background-color: rgba(51,65,85,1);
  border-radius: 0.25rem;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  display: flex;
  position: relative;
`

const MissionCardHeader = styled.div`
  width: 100%;
`

const MissionName = styled.div`
  line-height: 1.25;
  font-weight: 600;
  font-size: 1.125rem;
  text-align: center;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.75rem;
`

const ItemWrapper = styled.div`
  margin-bottom: 0.25rem;
  margin-right: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-right: 0.5rem;
  margin-top: 0.75rem;
  margin-left: 0.5rem;
  gap: 0.25rem;
`

const CharacterWrapper = styled.div`
  line-height: 1;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  margin-bottom: 0.25rem;
  margin-right: 0.25rem;
  margin-top: 0.75rem;
  margin-left: 0.5rem;
  gap: 2px;
`

const Character = styled.button`
  line-height: 1;
  background-color: rgba(100,116,139,1);
  border-radius: 0.5rem;
  overflow: hidden;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`

const CharacterImage = styled.img`
  object-position: center;
  object-fit: contain;
`