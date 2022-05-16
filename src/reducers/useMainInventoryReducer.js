import { v4 as uuidV4 } from "uuid"
import { ACTION } from './../constant/ActionConstant';

const initialState = [];

export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem("mainInventories")) || initialValue;

const reducer = (state, action) => {
  const payload = action.payload
  switch (action.type) {
    case ACTION.ADD:
      if (state.find(mainInventory => 
        mainInventory.type === payload.type
        && mainInventory.item === payload.item
        && mainInventory.tier === payload.tier
        )) {
          return state
        }
      return [...state, newInventory( payload )]
    case ACTION.DELETE:
      return state.filter(inventory => inventory.id !== payload.id);
    case ACTION.EDIT:
      return state.map(inventory => {
        if (inventory.id === payload.id) {
          return { ...inventory, value: payload.value > 0 ? payload.value : 0 } 
        } 
        return inventory
      }
      );
    default:
      return state;
  }
};
export default reducer;

function newInventory({ type, item, tier, value }) {
  return { id: uuidV4(), type, item, tier, value };
}
