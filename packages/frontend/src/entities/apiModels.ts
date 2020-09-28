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

export interface IOrder {
  order_id: number;
  customer_id: string;
  employee_id: number;
  order_date: Date;
  required_date: Date;
  shipped_date: Date;
  ship_via: number;
  freight: number;
  ship_name: string;
  ship_address: string;
  ship_city: string;
  ship_region: string;
  ship_postal_code: string;
  ship_country: string;
}

export interface IProduct {
  id: number;
  name: string;
  supplier: number;
  category: number;
  quantity_per_unit: string;
  price: number;
  units_in_stock: number;
  units_in_order: number;
  reorder_level: number;
  discontinued: number;
}

export interface IOrderDetails {
  order_id: number;
  product_id: number;
  unit_price: number;
  quantity: number;
  discount: number;
  order?: IOrder;
  product?: IProduct;
}



