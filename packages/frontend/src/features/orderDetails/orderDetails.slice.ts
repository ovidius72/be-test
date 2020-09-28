import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrderDetails} from "src/entities/apiModels";
import {ApiService} from "src/services/apiService";
import {AppDispatch, RootState} from "src/store/store";

export const ORDER_DETAILS_SLICE_NAME = "@orderDetails";

export interface IOrderDetailsState {
  orderDetails: IOrderDetails[];
  loading: boolean;
  error: string;
}

const initialState: IOrderDetailsState = {
  error: "",
  loading: false,
  orderDetails: [],
};


export const fetchOrderDetails = createAsyncThunk<
  IOrderDetails[],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${ORDER_DETAILS_SLICE_NAME}`, async (id, thunkApi) => {
  try {
    const details = await ApiService.orderDetails.getByOrderId(id);
    return details;
  } catch (error) {
    return thunkApi.rejectWithValue('Error fetching order details');
  }
});

export const orderDetailsSlice = createSlice({
  name: ORDER_DETAILS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderDetails.pending, (s) => ({
      ...s,
      loading: true,
      orderDetails: [],
      error: "",
    }));
    builder.addCase(fetchOrderDetails.rejected, (s) => ({
      ...s,
      loading: false,
      error: "Error loading oreders",
    }));
    builder.addCase(
      fetchOrderDetails.fulfilled,
      (s, a: PayloadAction<IOrderDetails[]>) => ({
        ...s,
        error: "",
        loading: false,
        orderDetails: a.payload
      })
    );
  },
});
