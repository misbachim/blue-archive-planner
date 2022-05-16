import React, { createContext, useContext, useEffect, useReducer } from "react"
import useMainNotesReducer, { initializer } from '../reducers/useMainNoteReducer'

const MainNotesContext = createContext()

export function useMainNotes() {
  return useContext(MainNotesContext)
}

// {
//   character: string,
//   note: string,
// }

export const MainNoteProvider = ({ children }) => {
  const [mainNotes, dispatch] = useReducer(useMainNotesReducer, [], initializer)

  useEffect(() => {
    localStorage.setItem("mainNotes", JSON.stringify(mainNotes));
  }, [mainNotes]);

  return (
    <MainNotesContext.Provider value={{mainNotes,dispatch}}>
      {children}
    </MainNotesContext.Provider>
  )
}