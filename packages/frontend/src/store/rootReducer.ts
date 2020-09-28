import {
  combineReducers
} from "@reduxjs/toolkit";
import {connectRouter} from "connected-react-router";
import {createBrowserHistory} from "history";
import {languageSlice} from "src/features/language/language.slice";
import {loginSlice} from "src/features/login/login.slice";
import {orderDetailsSlice} from "src/features/orderDetails/orderDetails.slice";
import {orderSlice} from "src/features/orders/orders.slice";
import {appLayoutSlice} from "../features/layout/layout.slice";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  appLayout: appLayoutSlice.reducer,
  router: connectRouter(history),
  language: languageSlice.reducer,
  login: loginSlice.reducer,
  orders: orderSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
});


export default rootReducer;
