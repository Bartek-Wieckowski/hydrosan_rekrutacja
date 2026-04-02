<script setup lang="ts">
import type { Database } from "#build/types/supabase-database";

const client = useSupabaseClient<Database>();

const { data } = await useAsyncData("debug", async () => {
  const { data, count } = await client
    .from("orders")
    .select("*", { count: "exact" })
    .limit(5)
    .order("id", { ascending: false });

  return { orders: data, total: count };
});
</script>

<template>
  <div>
    <h1 class="text-lg font-bold mb-2">DB VIEW — {{ data?.total }} rekordów</h1>
    <pre
      class="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 text-xs overflow-auto max-h-[85vh]"
      >{{ JSON.stringify(data?.orders, null, 2) }}</pre
    >
  </div>
</template>
