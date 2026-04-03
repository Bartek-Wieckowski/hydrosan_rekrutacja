Dziękuję za możliwość wzięcia udziału w rekrutacji. Poniżej krótkie podsumowanie mojego podejścia do zadania i decyzji, które podjąłem po drodze.

---

Starałem się zrealizować zarówno wymagania obowiązkowe, jak i punkty bonusowe. Oprócz tego pozwoliłem sobie na kilka usprawnień od siebie:

## Dodane z własnej inicjatywy

- **Dark/light theme** — toggle z zapisem w localStorage.
- **Widok lista/grid** — toggle z zapisem w localStorage.
- **Wyszukiwanie po ID** — szybki dostęp do konkretnego zamówienia.
- **Wyszukiwanie po numerze strony** — szybki dostęp do konkretnej strony zamówień.
- **Breadcrumb** — nawigacja kontekstowa na stronie pojedyńczego zamówienia.
- **Lightbox** — podgląd zdjęć produktów w powiększeniu.
- **Animacje** — Vue `<Transition>` dla przejść komponentów + `@vueuse/motion` dla animacji wejścia elementów.
- **Mobile-first** — responsywny layout, osobne podejście do tabeli i kart na mobile.

---

## Moje podejście

### Organizacja pracy

Projekt budowałem na osobnych branchach per funkcjonalność, które mergowałem do `main`. Historia commitów i merge'ów jest widoczna w repozytorium.

### Eksploracja bazy danych

Aby poznać pełną strukturę danych (dostępne statusy zamówień, formaty pól JSONB, wartości `payment.status` itp.), stworzyłem sobie tymczasową stronę `/dbview` oraz funkcję pomocniczą `extractUniqueValues()`, która wyciągała unikalne wartości z bazy. Dzięki temu mogłem:

- Wyciągnąć unikalne wartości statusów i użyć ich w filtrze
- Zweryfikować strukturę pól `payment`, `shipment`, `products`
- Upewnić się że typy TypeScript odpowiadają rzeczywistym danym

Obecnie kod strony `/dbview` jest zakomentowany — zostawiam go w repozytorium jedynie w formie poglądowej.

### Typowanie

Typy napisałem ręcznie na podstawie eksploracji bazy. W produkcyjnym projekcie oparłbym typowanie o automatycznie generowane typy z Supabase CLI:

```ts
// supabase gen types typescript --project-id <id> > types/database.ts
export type { Database } from "./database";

type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
```

Takie podejście eliminuje ryzyko rozsynchronizowania typów z bazą i daje pełne autocomplete na polach tabeli.

### SSR vs CSR

Zostawiłem SSR świadomie — aby pokazać pracę z pełnym cyklem Nuxt 3 (`useAsyncData`, hydratacja). W produkcyjnym panelu admina, gdzie SEO nie ma znaczenia, rozważyłbym CSR (`ssr: false` lub `routeRules`) dla prostszego modelu ładowania.

### Stany ładowania

Spinner przy zmianie filtrów/sortowania/strony, `NuxtLoadingIndicator` przy nawigacji między route'ami, empty state gdy brak wyników. Skeleton loadery są przygotowane na wypadek przejścia na CSR — przy obecnym SSR dane przychodzą wyrenderowane z serwera.

---

## Demo

### Desktop

<video src="https://developedbybart.pl/_MEDIA_FOR_SITES/videos/rekrutacja-desktop.mp4" controls></video>

### Mobile

<video src="https://developedbybart.pl/_MEDIA_FOR_SITES/videos/rekrutacja-mobile.mp4" controls></video>
