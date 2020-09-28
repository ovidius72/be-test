import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUserApi, IERPProfile} from "src/entities/apiModels";
import {ApiService} from "src/services/apiService";
import {Auth} from "src/services/auth";
import {AppDispatch, RootState} from "src/store/store";

export const loginThunk = createAsyncThunk<
  { user: IUserApi; erpProfile: IERPProfile },
  { email: string; password: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`login/login`, async ({ email, password }, thunkApi) => {
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
>(`login/fromToken`, async (_, thunkApi) => {
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
>(`login/logout`, async () => {
  try {
    const response = await ApiService.user.logout();
    Auth.deleteToken();
    return response;
  } catch (e) {
    return false;
  }
});
