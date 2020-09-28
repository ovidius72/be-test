import {createAsyncThunk} from "@reduxjs/toolkit";
import {IOrder} from "src/entities/apiModels";
import {ApiService} from "src/services/apiService";

export const loadOrderThunk = createAsyncThunk<IOrder[], string>(
  `@order/load`,
  async (erpId, thunkApi) => {
    try {
      const orders = await ApiService.orders.getByUserId(erpId);
      return orders;
    } catch (e) {
      return thunkApi.rejectWithValue("Error getting the user orders");
    }
  }
);

// export const loadOrderDetailsThunk = createAsyncThunk<>();

