import {
  IERPProfile,
  IOrder,
  IOrderDetails,
  ITokenApiModel,
  IUserApi,
  IUserLoginCredentials,
} from "src/entities/apiModels";

import { Auth } from "src/services/auth";
import {
  BASE_API_PATH,
  HTTP_MODE,
  WEATHER_API_KEY,
} from "src/services/constants";
import baseWretch from "wretch";
import { Wretcher, WretcherOptions } from "wretch/dist/wretcher";
// import { PaginatedResponse } from "src/store/common";
// import { notUndefined, isNill } from "src/utils/appUtils";

const wretchDefaults: WretcherOptions = {
  credentials: "include", // HTTP_CREDENTIALS,
  headers: { "Content-Type": "application/json" },
};

const wretchWithCorsOptions: WretcherOptions = {
  mode: "cors",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

const getWretch = () => {
  const options = HTTP_MODE === "cors" ? wretchWithCorsOptions : wretchDefaults;
  return baseWretch().url("").options(options);
};

const wretch = getWretch();

export const apiUrlBuilder = (url: string, customToken?: string): Wretcher => {
  const token: ITokenApiModel | undefined = Auth.getToken();
  const tokenId = customToken ? customToken : token && token.id ? token.id : "";
  const appWretch = wretch.auth(tokenId).url(`${BASE_API_PATH}/${url}`);
  return appWretch;
};

export const weatherApiBuilder = (
  name: string,
  state?: string,
  country?: string
): Wretcher => {
  let api = `http://api.openweathermap.org/data/2.5/forecast?q=${name}&lang=it&units=metric&cnt=5`;
  if (state) {
    api = `${api},${state}`;
  }
  if (country) {
    api = `${api},${country}`;
  }

  api = `${api}&appid=${WEATHER_API_KEY}`;

  const w = baseWretch().url("");
  return w.url(api);
};

enum Paths {
  users = "users",
  cities = "cities",
  customers = "customers",
  employees = "employees",
  orders = "orders",
  products = "products",
  categories = "categories",
  order_details = "order_details",
  region = "region",
  shippers = "shippers",
  suppliers = "suppliers",
  territories = "territories",
  us_states = "us_states",
}

// Parse an array of filters for loopback.
// return a string.
// export const parseFilters = <T extends Record<string, any>>(
//   filters?: T[]
// ): string => {
//   let filterString = "";
//   if (typeof filters !== "undefined") {
//     filterString = Object.keys(filters)
//       .filter((f) => {
//         const filter = filters[f];
//         const notDef =
//           notUndefined(f) && notUndefined(filter) && !isNill(filter);
//         return notDef;
//       })
//       .map((f) => {
//         const filter = filters[f];
//         const val = typeof filter === "object" ? encodeURI(filter) : filter;
//         return `${f}=${val}`;
//       })
//       .join("&");
//   }
//   return filterString;
// };

const pathFrom = (path: Paths | string, ...args: string[]) => {
  const sub = args && args.length > 0 ? "/" + args.join("/") : args;
  return `${path}${sub}`;
};

const fromUsers = (...args: string[]) => pathFrom(Paths.users, ...args);
// const fromCities = (...args: string[]) =>
//   pathFrom(Paths.cities, ...args);
// const fromUSStates = (...args: string[]) => pathFrom(Paths.us_states, ...args);
// const fromTerritories = (...args: string[]) =>
//   pathFrom(Paths.territories, ...args);
// const fromSuppliers = (...args: string[]) => pathFrom(Paths.suppliers, ...args);
// const fromShippers = (...args: string[]) => pathFrom(Paths.shippers, ...args);
// const fromRegion = (...args: string[]) => pathFrom(Paths.region, ...args);
const fromOrderDetails = (...args: string[]) =>
  pathFrom(Paths.order_details, ...args);
// const fromCategories = (...args: string[]) =>
//   pathFrom(Paths.categories, ...args);
// const fromProducts = (...args: string[]) => pathFrom(Paths.products, ...args);
const fromOrders = (...args: string[]) => pathFrom(Paths.orders, ...args);
// const fromEmployees = (...args: string[]) => pathFrom(Paths.employees, ...args);
const fromCustomers = (...args: string[]) => pathFrom(Paths.customers, ...args);

const getTokenId = () => {
  const token: ITokenApiModel | undefined = Auth.getToken();
  const tokenId = token && token.id ? token.id : "";
  return tokenId;
};

// TODO: Review how separators are added.
export const appendAccessToken = (url: string) => {
  const tokenId = getTokenId();
  const delimiter = url.includes("?") ? "&" : "?";
  if (tokenId) {
    return `${url}${delimiter}access_token=${tokenId}`;
  }
  return url;
};

// Retrive the error message from the response.
export const pickError = (err: any) => {
  try {
    const jsonError = JSON.parse(err.text);
    const nextErr = jsonError.error.message;
    return nextErr;
  } catch {
    return err.text ? err.text : err;
  }
};

// Retrive the error message from the response.
// Fallback to the given text if no error message is found.
export const pickErrorWithFallback = (err: any, fallbackErrorText: string) => {
  try {
    const jsonError = JSON.parse(err.text);
    const nextErr = jsonError.error.message;
    if (nextErr && typeof nextErr === "string") {
      return nextErr;
    } else {
      throw Error("Not a valid error message");
    }
  } catch (e) {
    return fallbackErrorText;
  }
};

// API ENDPOINTS
export const endpoints = {
  weather: {
    getByCityName: (name: string, countryCode?: string, state?: string) =>
      weatherApiBuilder(name, countryCode, state).get().json(),
  },

  orderDetails: {
    getByOrderId: (orderId: string) =>
      apiUrlBuilder(fromOrderDetails())
        .query(
          `filter[include]=product&filter[include]=order&filter[where][order_id]=${orderId}`
        )
        .get()
        .json<IOrderDetails[]>(),
  },
  orders: {
    getByUserId: (customerErpId: string) =>
      apiUrlBuilder(fromOrders())
        .query(`filter[where][customer_id]=${customerErpId}`)
        .get()
        .json<IOrder[]>(),
  },
  user: {
    getOne: (id: string, filters?: string) =>
      apiUrlBuilder(fromUsers(id))
        .query(filters || "")
        .get()
        .json<IUserApi>(),

    getAll: () => apiUrlBuilder(fromUsers()).get().json<IUserApi[]>(),

    login: (data: IUserLoginCredentials) => {
      return apiUrlBuilder(fromUsers("login"))
        .post(data)
        .json<ITokenApiModel>();
    },

    // logout the user with the passed inline token
    logout: async (): Promise<boolean> =>
      apiUrlBuilder(fromUsers("logout"))
        .post()
        .res((res) => {
          return res.ok && res.status === 204;
        }),
  },
  customers: {
    getOne: (id: string, filters?: string) =>
      apiUrlBuilder(fromCustomers(id))
        .query(filters || "")
        .get()
        .json<IERPProfile>(),
  },
};

export type ApiEndpointsType = typeof endpoints;
export { endpoints as ApiService };
