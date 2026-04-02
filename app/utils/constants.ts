import slugify from "slugify";

export const PER_PAGE = 15;

export const ORDER_STATUS = {
  Nowe: { label: "Nowe", color: "blue" },
  Anulowane: { label: "Anulowane", color: "red" },
  Wysłane: { label: "Wysłane", color: "green" },
  "Wysłane - Serwis": { label: "Wysłane (serwis)", color: "green" },
  Doręczone: { label: "Doręczone", color: "green" },
  Odebrano: { label: "Odebrano", color: "green" },
  "Czeka na kuriera": { label: "Czeka na kuriera", color: "yellow" },
} as const;

const ORDER_STATUS_EXTRA = [
  "BRAK STANU ZK",
  "PACZKOMATY [INPOST]",
  "Nowe [Serwis]",
  "BOXY / AUTOMATYPACZKOWE",
  "ZADBANO",
  "Zamówienia Anulowane ",
  "Anulowane Brak Towaru",
  "Czeka na wysyłkę [FV ZAL]",
  "Zamówienie po korekcie",
  "Wysłane - Zagranica",
  "KOPIA - NOWE SERWIS",
] as const;

const toSlug = (s: string) =>
  slugify(s, { lower: true, locale: "pl", strict: true });

export const ORDER_STATUS_OPTIONS = [
  { value: "", label: "Wszystkie statusy", slug: "" },
  ...Object.entries(ORDER_STATUS).map(([value, { label }]) => ({
    value,
    label,
    slug: toSlug(value),
  })),
  ...ORDER_STATUS_EXTRA.map((value) => ({
    value,
    label: value,
    slug: toSlug(value),
  })),
];

export const ORDER_COLUMNS = [
  { key: "id", label: "ID" },
  { key: "created_at", label: "Data" },
  { key: "customer", label: "Klient" },
  { key: "status", label: "Status" },
  { key: "total", label: "Kwota" },
  { key: "payment", label: "Płatność" },
] as const;

export const PAYMENT_STATUS = {
  paid: { label: "Opłacone", color: "green" },
  unpaid: { label: "Nieopłacone", color: "red" },
} as const;

export const TAB_KEYS = {
  client: "client",
  address: "address",
  payment: "payment",
  products: "products",
} as const;

export const TABS = [
  { key: TAB_KEYS.client, label: "Klient" },
  { key: TAB_KEYS.address, label: "Adres" },
  { key: TAB_KEYS.payment, label: "Płatność i dostawa" },
  { key: TAB_KEYS.products, label: "Produkty" },
] as const;

export type TabKey = keyof typeof TAB_KEYS;

export const LABELS = {
  // Client
  fullName: "Imię i nazwisko",
  email: "Email",
  phone: "Telefon",

  // Address
  street: "Ulica",
  postcode: "Kod pocztowy",
  city: "Miasto",

  // Payment
  method: "Metoda",
  paid: "Opłacono",
  status: "Status",

  // Delivery
  carrier: "Przewoźnik",
  cost: "Koszt",
} as const;
