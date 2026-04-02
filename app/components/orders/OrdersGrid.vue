<script setup lang="ts">
import type { Order } from "~/types";

defineProps<{ orders: Order[]; loading: boolean }>();

const modalOrder = ref<Order | null>(null);
</script>

<template>
  <div>
    <OrdersGridSkeleton v-if="loading" />

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <OrderCard
        v-for="order in orders"
        :key="order.id"
        :order="order"
        @inspect="modalOrder = $event"
      />
    </div>

    <OrderModal
      v-if="modalOrder"
      :order="modalOrder"
      @close="modalOrder = null"
    />
  </div>
</template>
