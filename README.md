# Zadanie rekrutacyjne - Frontend Developer (Vue / Nuxt 3)

Cześć! Bardzo się cieszymy, że bierzesz udział w naszym procesie rekrutacyjnym. Twoim zadaniem będzie stworzenie aplikacji wyświetlającej listę zamówień oraz ich szczegóły, korzystając z przygotowanego przez nas środowiska.

Projekt został już wstępnie skonfigurowany (Nuxt 3 + moduł Supabase), a w bazie danych czekają na Ciebie dziesiątki testowych zamówień. 

## 🎯 Cel zadania
Zbudowanie interfejsu składającego się z dwóch głównych elementów:
1. **Lista zamówień z paginacją** - przejrzysta tabela lub kafelki prezentujące podstawowe informacje.
2. **Szczegóły zamówienia** - widok prezentujący pełne informacje o pojedynczym zamówieniu wraz z listą produktów.

## 🛠 Środowisko i Wymagania techniczne
* **Framework:** Nuxt 3 (Vue 3, Composition API).
* **Baza danych:** Supabase (zainstalowany moduł `@nuxtjs/supabase`).
* **Stylizacja:** Użyj **Tailwind CSS**.
* **Autoryzacja:** **Brak.** Baza ma ustawione polityki (RLS) na publiczny odczyt (`SELECT`). Nie musisz budować systemu logowania.
* **Pobieranie danych:** Wykorzystaj composable `useSupabaseClient()`. 
  👉 **[Tutaj znajdziesz dokumentację, jak wyciągać dane z bazy w Nuxt.](https://supabase.nuxtjs.org/composables/usesupabaseclient#database-request)**

## 📋 Wymagania funkcjonalne

### 1. Lista zamówień (Główny widok)
Pobierz i wyświetl listę zamówień z tabeli `public.orders`. 
* **Obowiązkowa paginacja:** W bazie znajduje się bardzo dużo rekordów, dlatego musisz zaimplementować mechanizm stronicowania (np. 10-20 zamówień na stronę). Sposób podejścia i realizacji tego mechanizmu pozostawiamy całkowicie Twojej decyzji.
* Lista powinna zawierać minimum:
  * ID zamówienia
  * Datę utworzenia (`created_at`) – sformatowaną w czytelny sposób (np. `DD.MM.YYYY HH:mm`)
  * Imię i nazwisko klienta (`bill_name` + `bill_surname`)
  * Status zamówienia (`status`)
  * Kwotę całkowitą (`total_price` + waluta)

### 2. Detal zamówienia (Lista produktów i szczegóły)
Po kliknięciu w konkretne zamówienie wyświetl jego szczegóły. **Forma zależy całkowicie od Ciebie** – może to być nowa podstrona (routing `/orders/[id]`), wysuwany Drawer, Modal, rozwijany wiersz (accordion) w tabeli lub zakładki (Tabs). Ważne, aby UX/UI był przyjazny.

Podziel informacje na logiczne sekcje:
* **Dane klienta:** Imię, nazwisko, email, telefon.
* **Adres:** Ulica, numer, kod pocztowy, miasto.
* **Płatność i dostawa:** Informacje wyciągnięte z pól JSONB (`payment`, `shipment`).
* **Produkty (Wymagane):** Zbuduj estetyczną listę produktów na podstawie pola `products` (JSONB). Wyświetl miniaturkę zdjęcia (jeśli `image_url` nie jest `null`), nazwę produktu, SKU, cenę jednostkową oraz ilość. 

*(Poniżej znajdziesz strukturę, z jakiej będziesz korzystać).*

---

## 💾 Struktura Danych

Baza oparta jest o PostgreSQL (tabela `orders`). Najważniejsze pola to:
`id`, `created_at`, `total_price`, `status`, `email_adress`, `bill_name`, `bill_surname`, `bill_street`, `bill_postcode`, `bill_city`, `bill_phone`.

Dane takie jak płatność, dostawa i produkty trzymane są w formacie **JSONB**. Oto jak wyglądają w bazie, aby ułatwić Ci planowanie interfejsu:

**Pole `payment` (Przykład):**
```json
{
  "id": "4",
  "name": "Przelew",
  "paid": "0.00",
  "status": "unpaid",
  "currency": "PLN"
}
```

**Pole `shipment` (Przykład):**
```json
{
  "id": "31",
  "name": "GEODIS (Hydrosan)",
  "total": "179.99"
}
```

**Pole `products` (Przykład):**
```json[
  {
    "ean": "VISTA-CH-75X45",
    "sku": "VISTA-CH-75X45",
    "name": "ZLEW KUCHENNY ZLEWOZMYWAK DWUKOMOROWY STALOWY INOX VISTA-CH-75X45",
    "price": 416.49,
    "quantity": 1,
    "tax_rate": 23,
    "image_url": "https://imge.pl/p/315838/n/064c9c7f7bfa70fd9b225c397a9e27d7.jpg",
    "product_id": "6077"
  },
  {
    "ean": "5905186137739",
    "sku": "UCHWYT-ZLEW-2",
    "name": "UCHWYTY MONTAŻOWE DO ZLEWOZMYWAKA ZLEWU KUCHENNEGO",
    "price": 8.52,
    "quantity": 1,
    "tax_rate": 23,
    "image_url": null,
    "product_id": "6095"
  }
]
```

---

### 🌟 Mile widziane (Bonus - nieobowiązkowe)
Zrealizowanie tych punktów pokaże Twoje doświadczenie z aplikacjami produkcyjnymi:
* Obsługa stanów ładowania (Skeleton loaders / Spinners) oraz stanu pustego.
* Obsługa błędów (np. gdy zapytanie do bazy się nie powiedzie).
* Użycie TypeScriptu.
* Proste filtrowanie (np. tylko opłacone zamówienia) lub sortowanie po dacie na głównej liście.

---

## 🚀 Jak zacząć?

1. Zrób **Fork** tego repozytorium lub sklonuj je do siebie.
2. Utwórz plik `.env` w głównym katalogu projektu i wklej do niego klucze środowiskowe, które **otrzymałeś od nas w mailu**.
   ```env
   SUPABASE_URL=tutaj_url
   SUPABASE_KEY=tutaj_klucz
   ```
3. Zainstaluj zależności komendą: `npm install` (lub za pomocą `yarn` / `pnpm`).
4. Uruchom serwer deweloperski komendą: `npm run dev`.

Gdy skończysz, udostępnij nam link do swojego publicznego repozytorium na GitHub/GitLab lub spakuj projekt do `.zip` (pamiętaj, by usunąć folder `node_modules` i plik `.env`!).

**Powodzenia i miłego kodowania! 🚀**