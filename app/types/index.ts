export type Payment = {
  id: string;
  name: string;
  paid: "paid" | "unpaid";
  status: string;
  currency: "PLN" | "EUR";
};

export type Shipment = {
  id: string;
  name: string;
  total: string;
};

export type Product = {
  ean: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  tax_rate: number;
  image_url: string | null;
  product_id: string;
};

export type Order = {
  id: number;
  created_at: string;
  bill_name: string;
  bill_surname: string;
  bill_street: string;
  bill_postcode: string;
  bill_city: string;
  bill_phone: string;
  bill_home_number: string;
  bill_flat_number: string | null;
  email_adress: string;
  status: string;
  total_price: number;
  payment: Payment;
  shipment: Shipment;
  products: Product[];
};
