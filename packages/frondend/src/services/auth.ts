import {
  ITokenApiModel,
  IUserApi,
  IUserLoginCredentials,
} from "src/entities/apiModels";
import { ApiService } from "./apiService";

type AuthRepsonse = {
  token: ITokenApiModel;
  user: IUserApi;
};

const TOKEN_NAME = "be_token";
export const Auth = {
  login: async (credentials: IUserLoginCredentials): Promise<AuthRepsonse> => {
    try {
      const tokenItem = Auth.getToken();
      if (tokenItem) {
        const user = await ApiService.user.getOne(tokenItem.userId);
        return {
          token: tokenItem,
          user,
        };
      }
      Auth.deleteToken();
      const newToken = await ApiService.user.login(credentials);
      const nextUser = await ApiService.user.getOne(newToken.userId);
      Auth.setToken(newToken);
      return { token: newToken, user: nextUser };
    } catch (e) {
      console.log("e", e);
      throw e;
    }
  },
  logout: () => ApiService.user.logout,
  deleteToken: () => {
    localStorage.removeItem(TOKEN_NAME);
  },
  setToken: (token: string | ITokenApiModel) => {
    if (typeof token !== "string") {
      token = JSON.stringify(token);
    }
    localStorage.setItem(TOKEN_NAME, token);
  },
  getToken: (): ITokenApiModel | undefined => {
    const item = localStorage.getItem(TOKEN_NAME);
    if (item) {
      return JSON.parse(item);
    }
    return undefined;
  },
};
