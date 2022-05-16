import { v4 as uuidV4 } from "uuid"
import { ACTION } from './../constant/ActionConstant';

const initialState = [];

export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem("mainNotes")) || initialValue;

const reducer = (state, action) => {
  const payload = action.payload
  switch (action.type) {
    case ACTION.ADD:
      if (state.find(mainNote => 
          mainNote.character === payload.character
        )) {
          return state
        }
      return [...state, newNote( payload )]
    case ACTION.DELETE:
      return state.filter(note => note.id !== payload.id);
    case ACTION.EDIT:
      return state.map(note => {
        if (note.id === payload.id) {
          return { ...note, note: payload.note } 
        } 
        return note
      }
      );
    default:
      return state;
  }
};
export default reducer;

function newNote({ character, note }) {
  return { id: uuidV4(), character, note };
}
