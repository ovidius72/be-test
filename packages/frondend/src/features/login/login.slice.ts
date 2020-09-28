import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IERPProfile, IUserApi } from "src/entities/apiModels";
import { ApiService } from "src/services/apiService";
import { Auth } from "src/services/auth";
import { AppDispatch, RootState } from "src/store/store";

const sliceName = "@login";

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

export const loginThunk = createAsyncThunk<
  { user: IUserApi; erpProfile: IERPProfile },
  { email: string; password: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${sliceName}/login`, async ({ email, password }, thunkApi) => {
  try {
    const { user } = await Auth.login({ email, password });
    const erpProfile = await ApiService.customers.getOne(user.erpId);
    return { user, erpProfile };
  } catch (e) {
    console.log("e", e);
    return thunkApi.rejectWithValue("Login Error");
  }
});
export const loginWithToken = createAsyncThunk<
  { user: IUserApi; erpProfile: IERPProfile },
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${sliceName}/fromToken`, async (_, thunkApi) => {
  try {
    const token = Auth.getToken();
    if (token && token.id) {
      const user = await ApiService.user.getOne(token.userId);
      const erpProfile = await ApiService.customers.getOne(user.erpId);
      return { user, erpProfile };
    } else {
      return thunkApi.rejectWithValue("No");
    }
  } catch (error) {
    Auth.deleteToken();
    return thunkApi.rejectWithValue("No error");
  }
});

export const logoutThunk = createAsyncThunk<
  boolean,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${sliceName}/logout`, async () => {
  try {
    const response = await ApiService.user.logout();
    Auth.deleteToken();
    return response;
  } catch (e) {
    return false;
  }
});

export const loginSlice = createSlice({
  name: sliceName,
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
