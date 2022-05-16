import React, { createContext, useContext, useEffect, useReducer } from "react"
import useMainGoalsReducer, { initializer } from '../reducers/useMainGoalReducer'

const MainGoalsContext = createContext()

export function useMainGoals() {
  return useContext(MainGoalsContext)
}

/* Data for characters */
// {
//   id: string,
//   type: character,
//   character: string,
//   current: {
//     level: numeric,
//     rarity: numeric,
//   }
//   goal: {
//     level: numeric,
//     rarity: numeric,
//   }
// }

/* Data for skills */
// {
//   id: string,
//   type: skill,
//   character: string,
//   ex: {
//     current: numeric,
//     goal: numeric,
//   }
//   normal: {
//     current: numeric,
//     goal: numeric,
//   }
//   passive: {
//     current: numeric,
//     goal: numeric,
//   }
//   sub: {
//     current: numeric,
//     goal: numeric,
//   }
// }

/* Data for gears */
// {
//   id: string,
//   type: gear,
//   character: string,
//   gear1: {
//     current: numeric,
//     goal: numeric,
//   }
//   gear2: {
//     current: numeric,
//     goal: numeric,
//   }
//   gear3: {
//     current: numeric,
//     goal: numeric,
//   }
// }

export const MainGoalProvider = ({ children }) => {
  const [mainGoals, dispatch] = useReducer(useMainGoalsReducer, [], initializer)

  useEffect(() => {
    localStorage.setItem("mainGoals", JSON.stringify(mainGoals));
  }, [mainGoals]);

  return (
    <MainGoalsContext.Provider value={{mainGoals,dispatch}}>
      {children}
    </MainGoalsContext.Provider>
  )
}