import { Reducer } from "redux";
import { ILayoutState, LayoutActionTypes } from "./types";

// Type-safe initialState!
const initialState: ILayoutState = {
  theme: "light",
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<ILayoutState> = (state = initialState, action) => {
  switch (action.type) {
    case LayoutActionTypes.SET_THEME: {
      return { ...state, theme: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as layoutReducer };
