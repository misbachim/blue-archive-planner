import useToggle from './useModal';
import { useState } from 'react';

export default function useModal(defaultharacter) {
  const [isShowing, setIsShowing] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(defaultharacter)

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
    selectedCharacter,
    setSelectedCharacter
  }
}
