import {createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadCatalog} from "src/languages/i18n";
import {RootState} from "src/store/store";

const sliceName = 'LanguageSlice';

export interface ILanguage {
  iso_code: string;
  lang: string;
  dir: "RTL" | "LTR";
  label: string;
}
export type CatalogType = {
  [lang: string]: { messages: { [key: string]: string } };
};

export interface ILanguageState {
  readonly loading: boolean;
  readonly lang: string;
  readonly error: string;
  readonly catalog?: CatalogType;
}

const initialState: ILanguageState = {
  lang: "en",
  loading: false,
  error: "",
  catalog: undefined,
};

// Thunk example
export const fetchIt = createAsyncThunk(
  `${sliceName}/fetchIt`,
  () => {
    const x = 1;
    return x;
}
);

export const languageSlice = createSlice({
  name: sliceName,
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchIt.pending, s => ({ ...s }))
  },
  reducers: {
    loadLanguage: (s, a: PayloadAction<string>) => ({
      ...s,
      lang: a.payload,
      errors: "",
      loading: true,
    }),
    loadLanguageSuccess: (s) => ({
      ...s,
      loading: false,
    }),
    loadLanguageError: (s, a: PayloadAction<string>) => ({
      ...s,
      loading: false,
      error: a.payload,
    }),
  },
});

export const languageActions = languageSlice.actions;

export const loadLanguageCatalog = async (
  lang: string
): Promise<CatalogType | undefined> => {
  try {
    await new Promise(a => {
      setTimeout(() => {a()}, 600);
    });
    
    const catalog = await loadCatalog(lang);
    const messages = catalog.messages;
    return { [lang]: { messages } };
  } catch (e) {
    return undefined;
  }
};

// Selectors
const selectLanguageState = (state: RootState) => state.language;

export const selectedLanguage = createSelector([selectLanguageState], (s) => s.lang);
