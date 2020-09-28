import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IERPProfile, IUserApi} from "src/entities/apiModels";
import {logoutThunk, loginWithToken, loginThunk} from "./login.thunks";

export const LOGIN_SLICE_NAME = "login";

export type ILoginState = {
  user: IUserApi | undefined;
  ERPProfile: IERPProfile | undefined;
  loading: boolean;
  error: string;
  successful: boolean;
  failed: boolean;
};

const initialState: ILoginState = {
  error: "",
  loading: false,
  ERPProfile: undefined,
  user: undefined,
  successful: false,
  failed: false,
};


export const loginSlice = createSlice({
  name: LOGIN_SLICE_NAME,
  initialState,
  reducers: {
    setLoading: (s, a: PayloadAction<boolean>) => ({
      ...s,
      loading: a.payload,
      successful: false,
    }),
    logout: (s) => ({
      ...s,
      successful: false,
      error: "",
      ERPProfile: undefined,
      user: undefined,
    }),
  },
  extraReducers: (b) => {
    // LOGOUT
    b.addCase(logoutThunk.pending, (s) => ({
      ...s,
      loading: true,
    }));
    b.addCase(logoutThunk.fulfilled, (s) => ({
      ...s,
      user: undefined,
      ERPProfile: undefined,
      successful: false,
      loading: false,
      failed: true,
    }));
    b.addCase(logoutThunk.rejected, (s) => ({
      ...s,
      loading: false,
      failed: true,
    }));
    // LOGIN WITH TOKEN
    b.addCase(loginWithToken.pending, (s) => ({
      ...s,
      loading: true,
      error: "",
    }));
    b.addCase(loginWithToken.rejected, (s) => ({
      ...s,
      error: "",
      loading: false,
      failed: true,
    }));
    b.addCase(
      loginWithToken.fulfilled,
      (s, a: PayloadAction<{ user: IUserApi; erpProfile: IERPProfile }>) => ({
        ...s,
        loading: false,
        user: a.payload.user,
        ERPProfile: a.payload.erpProfile,
        successful: true,
      })
    );
    // LOGIN
    b.addCase(loginThunk.fulfilled, (s, a) => ({
      ...s,
      user: a.payload.user,
      ERPProfile: a.payload.erpProfile,
      successful: true,
      loading: false,
    }));
    b.addCase(loginThunk.pending, (s) => ({
      ...s,
      user: undefined,
      erpProfile: undefined,
      successful: false,
      loading: true,
      error: "",
      ERPProfile: undefined,
    }));
    b.addCase(loginThunk.rejected, (s, a) => ({
      ...s,
      user: undefined,
      ERPProfile: undefined,
      successful: false,
      loading: false,
      failed: true,
      error: a.error.message || (a.payload as string),
    }));
  },
});

export const loginActions = loginSlice.actions;
