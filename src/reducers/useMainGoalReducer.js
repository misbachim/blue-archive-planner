import { v4 as uuidV4 } from "uuid"
import { RESOURCE_TYPE } from "../constant/ResourceDataConstant";
import { ACTION } from './../constant/ActionConstant';

const initialState = [];

export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem("mainGoals")) || initialValue;

const reducer = (state, action) => {
  const payload = action.payload
  switch (action.type) {
    case ACTION.ADD:
      if (payload.type===RESOURCE_TYPE.CHARACTER) {
        if (state.find(mainGoal => 
          mainGoal.character === payload.character
          && mainGoal.type === payload.type
          )) {
            return state
          }
        return [...state, newCharacterGoal( payload )]
      }
      if (payload.type===RESOURCE_TYPE.SKILL) {
        if (state.find(mainGoal => 
          mainGoal.character === payload.character
          && mainGoal.type === payload.type
          )) {
            return state
          }
        return [...state, newSkillGoal( payload )]
      }
      if (payload.type===RESOURCE_TYPE.GEAR) {
        if (state.find(mainGoal => 
          mainGoal.character === payload.character
          && mainGoal.type === payload.type
          )) {
            return state
          }
        return [...state, newGearGoal( payload )]
      }
      return state
    case ACTION.DELETE:
      return state.filter((goal) => {
        return goal.type === payload.type
                && goal.character !== payload.character
      })
    case ACTION.EDIT:
      return state.map(goal => {
        if (goal.id === payload.id) {
          if (payload.type===RESOURCE_TYPE.CHARACTER) {
            return { ...goal, current: payload.current, goal: payload.goal } 
          }
          if (payload.type===RESOURCE_TYPE.SKILL) {
            return { ...goal, 
                ex: payload.ex,
                normal: payload.normal,
                passive: payload.passive,
                sub: payload.sub
              } 
          }
          if (payload.type===RESOURCE_TYPE.GEAR) {
            return { ...goal, current: payload.current, goal: payload.goal } 
          }
        } 
        return goal
      }
      );
    default:
      return state;
  }
};
export default reducer;

function newCharacterGoal({ type, character, current, goal }) {
  return { id: uuidV4(), type, character, current, goal };
}

function newSkillGoal({ type, character, ex, normal, passive, sub }) {
  return { id: uuidV4(), type, character, ex, normal, passive, sub };
}

function newGearGoal({ type, character, current, goal }) {
  return { id: uuidV4(), type, character, current, goal };
}
