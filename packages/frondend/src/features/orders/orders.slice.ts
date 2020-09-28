import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiService } from "src/services/apiService";

export interface IOrder {
  order_id: number;
  customer_id: string;
  employee_id: number;
  order_date: Date;
  required_date: Date;
  shipped_date: Date;
  ship_via: number;
  freight: number;
}

const SLICE_NAME = "@order";

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

export const loadOrderThunk = createAsyncThunk<IOrder[], string>(
  `${SLICE_NAME}/load`,
  async (erpId, thunkApi) => {
    try {
      const orders = await ApiService.orders.getByUserId(erpId);
      return orders;
    } catch (e) {
      return thunkApi.rejectWithValue("Error getting the user orders");
    }
  }
);

export const orderSlice = createSlice({
  name: SLICE_NAME,
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

