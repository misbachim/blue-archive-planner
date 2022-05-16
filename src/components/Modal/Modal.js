import React, { useCallback, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import { animated, useSpring } from 'react-spring';
import { Background, ModalWrapper, CloseModalButton } from './ModalStyle'
import { CharacterDetails, CharacterSelection } from './steps';
import useStep from '../../hooks/useStep';
import { MainNoteProvider } from '../../contexts/MainNoteContext';

const steps = [
  { id: "selection" },
  { id: "detail" },
];

export const Modal = ({ showModal, setShowModal
  , selectedCharacter, setSelectedCharacter 
}) => {
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;
  const props = { selectedCharacter, setSelectedCharacter, navigation };
  let characterStep = null
    switch (id) {
      case "selection":
        characterStep = <CharacterSelection {...props} />;
        break
      case "detail":
        characterStep = <CharacterDetails {...props} setShowModal={setShowModal} />;
        break
      default:
        characterStep = null;
    }

  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    top: `10px`,
    position: `absolute`,
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal();
      navigation.go(0)
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal();
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return ReactDom.createPortal(
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <MainNoteProvider>
                {characterStep}
              </MainNoteProvider>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => {
                  setShowModal()
                  navigation.go(0)
                  }
                }
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>,
    document.getElementById('portal')
  );
};