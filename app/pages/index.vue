<script setup lang="ts">
import type { Order } from "~/types";

const client = useSupabaseClient();
const route = useRoute();
const { mode, set: setView } = useViewMode();

const listAnchor = ref<HTMLElement | null>(null);

const page = computed(() => Number(route.query.page || 1));
const sort = computed(() => (route.query.sort as string) || "desc");
const statusSlug = computed(() => (route.query.status as string) || "");
const statusFilter = computed(
  () =>
    ORDER_STATUS_OPTIONS.find((o) => o.slug === statusSlug.value)?.value ?? "",
);

const { data, pending, error } = await useAsyncData(
  "orders",
  async () => {
    let query = client
      .from("orders")
      .select(
        "id, created_at, bill_name, bill_surname, bill_street, bill_postcode, bill_city, bill_phone, bill_home_number, bill_flat_number, email_adress, status, total_price, payment, shipment, products",
        {
          count: "exact",
        },
      )
      .order("created_at", { ascending: sort.value === "asc" })
      .range((page.value - 1) * PER_PAGE, page.value * PER_PAGE - 1);

    if (statusFilter.value) {
      query = query.eq("status", statusFilter.value);
    }

    const { data, count, error } = await query;
    if (error) {
      console.error(error);
      throw createError({ statusCode: 500, message: error.message });
    }
    if (!data)
      throw createError({
        statusCode: 500,
        message: "Brak danych z serwera",
      });
    return { orders: data as Order[], total: count ?? 0 };
  },
  { watch: [page, sort, statusFilter] },
);

const total = computed(() => data.value?.total ?? 0);
const totalPages = computed(() => Math.ceil(total.value / PER_PAGE));

const visiblePages = computed(() => {
  const tot = totalPages.value;

  if (tot <= 2) return [];

  const curr = Math.min(page.value, tot);

  if (tot <= 5) {
    return Array.from({ length: tot - 2 }, (_, i) => i + 2);
  }

  let start = curr - 1;
  let end = curr + 1;

  if (curr <= 3) {
    start = 2;
    end = 4;
  }
  if (curr >= tot - 2) {
    start = tot - 3;
    end = tot - 1;
  }

  start = Math.max(2, start);
  end = Math.min(tot - 1, end);

  if (start > end) return [];

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const orders = computed(() => data.value?.orders ?? []);
const isRefetching = computed(() => pending.value && orders.value.length > 0);
const isInitialLoad = computed(
  () => pending.value && orders.value.length === 0,
);

const setQuery = (params: Record<string, string | number | undefined>) => {
  navigateTo({ query: { ...route.query, ...params } });
  nextTick(() => {
    listAnchor.value?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
};

watch(totalPages, (tot) => {
  if (tot > 0 && page.value > tot) {
    setQuery({ page: 1 });
  }
});
</script>

<template>
  <div>
    <!-- Toolbar -->
    <div
      v-if="pending || (!error && orders.length > 0)"
      ref="listAnchor"
      class="flex items-center justify-between mb-4 gap-3"
    >
      <OrdersFilter
        :sort="sort"
        :status-slug="statusSlug"
        :loading="isRefetching"
        @change="setQuery($event)"
      />
      <OrderIdSearch class="hidden md:block" />

      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-400 dark:text-gray-500">
          {{ total }} zamówień
        </span>
        <div
          class="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <button
            :class="
              mode === 'list'
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            "
            class="px-3 py-1.5 transition-colors duration-150"
            aria-label="Widok listy"
            @click="setView('list')"
          >
            <Icon name="heroicons:list-bullet" class="w-4 h-4" />
          </button>
          <button
            :class="
              mode === 'grid'
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            "
            class="px-3 py-1.5 transition-colors duration-150"
            aria-label="Widok siatki"
            @click="setView('grid')"
          >
            <Icon name="heroicons:squares-2x2" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    <OrderIdSearch class="w-full md:hidden mb-6" />

    <!-- Error -->
    <ErrorAlert v-if="error" message="Błąd ładowania danych." />

    <!-- Empty state -->
    <EmptyStateAlert
      v-if="!pending && !error && orders.length === 0"
      icon="heroicons:inbox"
      message="Brak zamówień"
    />

    <!-- Content -->
    <div
      v-else
      :key="mode"
      v-motion
      :initial="{ opacity: 0, y: 8 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 220 } }"
    >
      <OrdersTable
        v-if="mode === 'list'"
        :orders="orders"
        :loading="isInitialLoad"
        :sort="sort"
        :status-slug="statusSlug"
        @sort="setQuery({ sort: $event, page: 1 })"
        @filter-status="setQuery({ status: $event, page: 1 })"
      />
      <OrdersGrid v-else :orders="orders" :loading="isInitialLoad" />
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-8">
      <OrdersPagination
        :page="page"
        :total-pages="totalPages"
        :visible-pages="visiblePages"
        @change="setQuery({ page: $event })"
      />
    </div>
  </div>
</template>
