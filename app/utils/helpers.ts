import type { Order, Payment } from "~/types";

export const extractUniqueValues = (orders: Order[]) => {
  const paymentStatuses = new Set<string>();
  const orderStatuses = new Set<string>();
  const currencies = new Set<string>();

  orders.forEach((order) => {
    if (order.payment.status) {
      paymentStatuses.add(order.payment.status);
    }
    if (order.status) {
      orderStatuses.add(order.status);
    }
    if (order.payment.currency) {
      currencies.add(order.payment.currency);
    }
  });

  return {
    paymentStatuses: [...paymentStatuses],
    orderStatuses: [...orderStatuses],
    currencies: [...currencies],
  };
};

export const currencySymbol = (currency: Payment["currency"]) => {
  switch (currency) {
    case "PLN":
      return "zł";
    case "EUR":
      return "€";
  }
};

export const formatPrice = (
  price: number,
  currency: Payment["currency"] = "PLN",
) => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(price);
};

export const formatDate = (dateStr: string): string => {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
};
