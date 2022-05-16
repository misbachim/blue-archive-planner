import React from 'react'
import styled from 'styled-components';
import { CharacterCard } from "../../../Card";
import { useMainGoals } from '../../../../contexts/MainGoalContext';
import chardata from '../../../../resource/charData.json'

export function CharacterSelection({ selectedCharacter, setSelectedCharacter, navigation }) {
  const { mainGoals } = useMainGoals()
  const { next } = navigation
  if (selectedCharacter !== null) {
    next()
  }

  function getCharacters() {
    return chardata.filter((cd) => 
      !mainGoals.find(({ character }) => character === cd.student))
  }

  function handleCardClick(characterName) {
    setSelectedCharacter(characterName)
    next()
  }

  return (
    <>
      <ModalContent>
        <Wrapper>
          {/* <Filter>Filter</Filter>
          <FilterWrapper>
            <FilterCard>
              Attacker
            </FilterCard>
          </FilterWrapper> */}
          <CharacterWrapper>
            {getCharacters().map((item) => {
              const char = chardata.find(char => char.student===item.student)
              const image = char.image
              const school = char.school
              return (
                <CharacterCard 
                  key={item.student} 
                  character={item.student} 
                  name={item.name} 
                  image={image} 
                  school={school} 
                  onCharacterClick={() => handleCardClick(item.student)} />
              )
            })}
          </CharacterWrapper>
        </Wrapper>
      </ModalContent>
    </>
  )

}

const ModalContent = styled.div`
width: 600px;
display: flex;
flex-direction: column;
justify-content: center;
line-height: 1.8;
color: #fff;
p {
  margin-bottom: 1rem;
}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
`

const CharacterWrapper = styled.div`
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
`