import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ApiService} from "src/services/apiService";
import {AppDispatch, RootState} from "src/store/store";

export const WEATHER_SLICE_NAME = "@weather";

export interface IWeatherState {
  data: any;
  loading: boolean;
  error: string;
}

const initialState: IWeatherState = {
  error: "",
  loading: false,
  data: undefined,
};


export const fetchCityWeatherThunk = createAsyncThunk<
  any,
  {cityName: string, countryCode?: string, state?: string},
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${WEATHER_SLICE_NAME}`, async ({ cityName, countryCode, state}, thunkApi) => {
  try {
    const details = await ApiService.weather.getByCityName(cityName,countryCode,state);
    console.log("details", details);
    return details;
  } catch (error) {
    console.log("error", error);
    return thunkApi.rejectWithValue('Error fetching the weather');
  }
});

export const weatherSlice = createSlice({
  name: WEATHER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCityWeatherThunk.pending, (s) => ({
      ...s,
      loading: true,
      error: "",
    }));
    builder.addCase(fetchCityWeatherThunk.rejected, (s) => ({
      ...s,
      loading: false,
      error: "Error loading weather",
    }));
    builder.addCase(
      fetchCityWeatherThunk.fulfilled,
      (s, a: PayloadAction<any>) => ({
        ...s,
        error: "",
        loading: false,
        data: a.payload
      })
    );
  },
});
