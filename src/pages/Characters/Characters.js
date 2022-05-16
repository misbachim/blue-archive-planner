import React, { useEffect, useState, useRef } from 'react'
import './Characters.css'
import { Modal } from '../../components/Modal/Modal'
import useFetch from "../../hooks/useFetch";
import { useLocalStorage } from '../../hooks/useStorage';
import { CharacterCard } from '../../components/Card';
import useEventListener from './../../hooks/useEventListener';
import { useMainGoals } from './../../contexts/MainGoalContext';
import chardata from '../../resource/charData.json'
import useModal from './../../hooks/useModal';
import styled from 'styled-components';

export default function Characters() {
  const { isShowing, toggle, selectedCharacter, setSelectedCharacter } = useModal(null)
  const { mainGoals } = useMainGoals()
  
  const openModal = () => {
    setSelectedCharacter(null)
    toggle()
  }
  function openModalCharacter(character) {
    setSelectedCharacter(character)
    toggle()
  }

  function getCharacters() {
    let mappedComponent = []
    mainGoals.forEach(item => {
      if (mappedComponent.some(m => m.key === item.character)) {
        return
      }
      const char = chardata.find((char) => char.student===item.character)
      const name = char.name
      const image = char.image
      const school = char.school
      mappedComponent.push((
        <CharacterCard 
            key={item.character}
            character={item.character} 
            name={name} 
            image={image} 
            school={school} 
            onCharacterClick={() => openModalCharacter(item.character)} />
      ))
    })
    return mappedComponent
  }
  
  return (
    <>
      <Header>Characters</Header>
      <Wrapper>
        <ButtonAdd onClick={openModal}>Add</ButtonAdd>
      </Wrapper>
      <Modal showModal={isShowing} setShowModal={toggle} selectedCharacter={selectedCharacter} setSelectedCharacter={setSelectedCharacter}/>
      <StudentWrapper>
        {getCharacters()}
      </StudentWrapper>
    </>
    
  )
  
}

const Header = styled.h1`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
`

const ButtonAdd = styled.button`
  width: 8rem;
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  transition-duration: .15s;
  font-weight: 600;
  font-size: .875rem;
  line-height: 1.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  background-color: rgba(14,165,233,1);
  border-radius: 0.25rem;
  cursor: pointer;
`

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  margin-top: 1rem;
`

const StudentWrapper = styled(Wrapper)`
  justify-content: flex-start;
  flex-wrap: wrap;
`