<script setup lang="ts">
const client = useSupabaseClient();

const { data } = await useAsyncData("debug", async () => {
  const { data, count } = await client
    .from("orders")
    .select("*", { count: "exact" })
    // .limit(5)
    .order("id", { ascending: false });

  return { orders: data, total: count };
});

const uniqueValues = data.value?.orders
  ? extractUniqueValues(data.value.orders)
  : { paymentStatuses: [], orderStatuses: [], currencies: [] };
</script>

<template>
  <div>
    <h1 class="text-lg font-bold mb-2">DB VIEW — {{ data?.total }} rekordów</h1>

    <div class="mb-6">
      <h2 class="font-semibold">Unikalne statusy płatności:</h2>
      <pre class="bg-gray-100 dark:bg-gray-900 p-2 rounded">{{
        uniqueValues.paymentStatuses
      }}</pre>
    </div>

    <div class="mb-6">
      <h2 class="font-semibold">Unikalne statusy zamówień:</h2>
      <pre class="bg-gray-100 dark:bg-gray-900 p-2 rounded">{{
        uniqueValues.orderStatuses
      }}</pre>
    </div>

    <div class="mb-6">
      <h2 class="font-semibold">Unikalne waluty:</h2>
      <pre class="bg-gray-100 dark:bg-gray-900 p-2 rounded">{{
        uniqueValues.currencies
      }}</pre>
    </div>
    <pre
      class="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 text-xs overflow-auto max-h-[85vh]"
      >{{ JSON.stringify(data?.orders, null, 2) }}</pre
    >
  </div>
</template>
