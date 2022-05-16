import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { MdArrowBack } from 'react-icons/md';
import TabComponent from './TabComponent';
import chardata from '../../../../resource/charData.json'
import schooldata from '../../../../resource/schooldata.json'
import { IconContext } from 'react-icons';
import { BsTrashFill } from 'react-icons/bs';
import { useMainNotes } from '../../../../contexts/MainNoteContext';
import { ACTION } from './../../../../constant/ActionConstant';

export function CharacterDetails({ selectedCharacter, setSelectedCharacter, navigation, setShowModal }) {
  const { mainNotes, dispatch } = useMainNotes()
  const [noteState, setNoteState] = useState(getNote())

  const { previous } = navigation

  const char = chardata.find((char) => char.name===selectedCharacter)
  const imageUrl = char.image
  const school = char.school
  
  function getBackgroundImage() {
      return schooldata.find((sd) => sd.name===school).image
  } 

  function getNote() {
    const noteContext = mainNotes.find(note => note.character === selectedCharacter)
    if (noteContext === undefined) return '' 
    return noteContext.note
  }

  function changeNoteState(e) {
    setNoteState(e.target.value)
  }

  useEffect(() => {
    const mainNote = mainNotes.find(note => note.character === selectedCharacter)

    if (mainNote === undefined && noteState !== '') {
      dispatch({
        type: ACTION.ADD, 
        payload: {
          character: selectedCharacter,
          note: noteState
        }
      })
    }
    if (mainNote !== undefined && noteState === '') {
      dispatch({
        type: ACTION.DELETE, 
        payload: {
          id: mainNote.id,
        }
      })
    }
    if (mainNote !== undefined && noteState !== '') {
      dispatch({
        type: ACTION.EDIT, 
        payload: {
          id: mainNote.id,
          note: noteState
        }
      })
    }

  }, [noteState])
  
  return (
    <>
      <HeaderBackground bg={getBackgroundImage()}>
        <HeaderWrapper>
          <BackButton
            aria-label='Back modal'
            onClick={() => { 
                setSelectedCharacter(null)
                previous()
              }
            }
            />
          <ImageWrapper 
            style={{
              borderRadius: '5px',
              height: '80px',
              width: '80px',
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          ></ImageWrapper>
          {selectedCharacter.toUpperCase()}
          <DeleteButton 
            onClick={() => {
              dispatch({
                type: ACTION.DELETE,
                payload: {
                  type: 'character',
                  character: selectedCharacter
                }
              })
              previous()
              setShowModal()
            }}>
            <IconContext.Provider
              value={{ color: 'white', size:20}}
            >
              <BsTrashFill />
            </IconContext.Provider>
          </DeleteButton>
        </HeaderWrapper>
      </HeaderBackground>
      <Detail>
        <Note type='text' placeholder='Notes' 
            value={noteState} onChange={(e) => changeNoteState(e)}/>
        <TabComponent selectedCharacter={selectedCharacter} />
      </Detail>
    </>
  )
}

const HeaderBackground = styled.div`
  border-radius: 10px 10px 0px 0px;
  background-image: url(${(props) => props.bg}); 
  background-repeat: no-repeat;
  background-position: 30% 30%;
  width: 100%;
  height: 100px;
`

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2%;
`

const Note = styled.input`
  width: 100%;
  font-size: 11px;
  padding: 10px;
  margin: 10px;
  background: #334154;
  border: 1px solid #475569;
  border-radius: 3px;
  color: white;
  ::placeholder {
    color: #475569;
  }
  :enabled:focus {
    outline-offset: 0;
    box-shadow: 0 0 0 1px #cf95d9;
    border-color: #ba68c8;
  }
`

const HeaderWrapper = styled.div`
  backdrop-filter: blur(5px);
  font-weight: bold;
  font-size: 1.125rem;
  line-height: 1.75rem;
  display: flex;
  align-items: center;
  padding: 8px 24px 8px 24px;
  gap: 20px;
  width: 100%;
  height: 100px;
`

const ImageWrapper = styled.div`
`

const BackButton = styled(MdArrowBack)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  background-color: hsl(217,32%,17%);
  border-radius: 50%;
`;

const DeleteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border-color: transparent;
  /* width: 1rem;
  height: 1rem; */
`