import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrder} from "src/entities/apiModels";
import {loadOrderThunk} from "./orders.thunks";

export const ORDER_SLICE_NAME = "@order";

export interface IOrderState {
  orders: IOrder[];
  loading: boolean;
  error: string;
}

const initialState: IOrderState = {
  error: "",
  loading: false,
  orders: [],
};

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadOrderThunk.pending, (s) => ({
      ...s,
      loading: true,
      error: "",
    }));
    builder.addCase(loadOrderThunk.rejected, s => ({
      ...s,
      loading: false,
      error: 'Error loading oreders',
    }));
    builder.addCase(loadOrderThunk.fulfilled, (s, a: PayloadAction<IOrder[]>) => ({
      ...s,
      error: '',
      loading: false,
      orders: a.payload,
    }));
  },
});

