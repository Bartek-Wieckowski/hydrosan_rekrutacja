<script setup lang="ts">
import { onlyDigits } from "~/utils/helpers";

const searchId = ref("");

const goToOrder = () => {
  const id = parseInt(searchId.value);
  if (!id) return;
  navigateTo(ROUTES.orders.detail(id));
};
</script>

<template>
  <div class="relative max-w-[20rem] w-full">
    <Icon
      name="heroicons:magnifying-glass"
      class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-800 dark:text-gray-200"
    />
    <input
      v-model="searchId"
      type="text"
      inputmode="numeric"
      placeholder="Szukaj po ID... i wciśnij Enter"
      class="h-9 pl-9 pr-3 rounded-full text-sm border border-gray-200 dark:border-gray-700 bg-transparent text-gray-600 dark:text-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500 w-full"
      @keydown="onlyDigits"
      @keydown.enter="goToOrder"
    />
  </div>
</template>
