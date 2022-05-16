import React, { createContext, useContext, useEffect, useReducer } from "react"
import useMainInventoriesReducer, { initializer } from '../reducers/useMainInventoryReducer'

const MainInventoriesContext = createContext()

export function useMainInventories() {
  return useContext(MainInventoriesContext)
}

// {
//   id: string,
//   type: string,
//   item: string,
//   tier: number,
//   value: number
// }

export const MainInventoryProvider = ({ children }) => {
  const [mainInventories, dispatch] = useReducer(useMainInventoriesReducer, [], initializer)

  useEffect(() => {
    localStorage.setItem("mainInventories", JSON.stringify(mainInventories));
  }, [mainInventories]);

  return (
    <MainInventoriesContext.Provider value={{mainInventories,dispatch}}>
      {children}
    </MainInventoriesContext.Provider>
  )
}