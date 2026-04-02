<script setup lang="ts">
import type { Order } from "~/types";

defineProps<{ order: Order }>();
const emit = defineEmits<{ inspect: [order: Order] }>();
</script>

<template>
  <div
    class="group relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all cursor-pointer"
    @click="navigateTo(ROUTES.orders.detail(order.id))"
  >
    <div class="flex items-start justify-between mb-3">
      <span class="font-mono text-xs text-gray-400 dark:text-gray-500"
        >#{{ order.id }}</span
      >
      <StatusBadge :status="order.status" />
    </div>
    <p class="font-semibold text-sm mb-1 truncate">
      {{ order.bill_name }} {{ order.bill_surname }}
    </p>
    <p class="text-xs text-gray-400 dark:text-gray-500 mb-4">
      {{ formatDate(order.created_at) }}
    </p>
    <p class="text-lg font-bold tabular-nums">
      {{ formatPrice(order.total_price, order.payment.currency) }}
    </p>

    <!-- Overlay on hover -->
    <div
      class="absolute inset-0 rounded-xl bg-gray-900/60 dark:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3"
      @click.stop
    >
      <button
        class="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full hover:scale-105 transition-transform shadow-lg"
        aria-label="Podgląd"
        @click.stop="emit('inspect', order)"
      >
        <Icon
          name="heroicons:magnifying-glass"
          class="w-5 h-5 text-gray-800 dark:text-gray-200"
        />
      </button>
      <NuxtLink
        :to="`${ROUTES.orders.detail(order.id)}`"
        class="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full hover:scale-105 transition-transform shadow-lg"
        aria-label="Otwórz zamówienie"
        @click.stop
      >
        <Icon
          name="heroicons:arrow-top-right-on-square"
          class="w-5 h-5 text-gray-800 dark:text-gray-200"
        />
      </NuxtLink>
    </div>
  </div>
</template>
