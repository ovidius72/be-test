import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "src/store/store";
import * as themes from "../../styles/theme";

type ThemeValue = "light" | "dark";
type SliceState = {
  theme: ThemeValue;
};

const initialState: SliceState = {
  theme: "light",
};

export const appLayoutSlice = createSlice({
  name: "appLayout",
  initialState,
  reducers: {
    setDarkTheme: (state) => ({ ...state, theme: "dark" }),
    setLightTheme: (state) => ({ ...state, theme: "light" }),
    setTheme: (s, a: PayloadAction<ThemeValue>) => {
      s.theme = a.payload;
    },
  },
});

export const { setTheme, setDarkTheme, setLightTheme } = appLayoutSlice.actions;
export const layoutActions = appLayoutSlice.actions;


// selectors
const selectLayoutState = (state: RootState) => state.appLayout;
export const selectedLayoutTheme = createSelector(
  [selectLayoutState],
  (s) => themes[s.theme]
);
