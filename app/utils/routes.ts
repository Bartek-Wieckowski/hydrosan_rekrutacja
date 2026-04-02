export const ROUTES = {
  home: "/",
  orders: {
    list: "/orders",
    detail: (id: string | number) => `/orders/${id}`,
  },
} as const;
