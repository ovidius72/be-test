export interface ICityApi {
  id: string;
  name: string;
  state: string | undefined;
  code: string | undefined;
}

export interface IUserApi {
  id: string;
  username: string;
  email: string;
  erpId: string;
  preferredCities: ICityApi[];
}

export interface IERPProfile {
  id: string;
  companyName: string;
  contact_name: string;
  contact_title: string;
  address: string;
  city: string;
  region: string;
  postal_code: string;
  country: string;
  phone: string;
  fax: string;
}

export interface IUserLoginCredentials {
  email: string;
  password: string;
}

export interface ITokenApiModel {
  id: string;
  ttl: number;
  created: Date;
  userId: string;
}
