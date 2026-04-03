<script setup lang="ts">
import type { Order } from "~/types";

const client = useSupabaseClient();
const route = useRoute();

const {
  data: order,
  pending,
  error,
} = await useAsyncData(`order-${route.params.id}`, async () => {
  const { data, error } = await client
    .from("orders")
    .select(
      "id, created_at, bill_name, bill_surname, bill_street, bill_postcode, bill_city, bill_phone, bill_home_number, bill_flat_number, email_adress, status, total_price, payment, shipment, products",
    )
    .eq("id", Number(route.params.id))
    .single();

  if (error) {
    throw createError({ statusCode: 404, message: error.message });
  }

  const raw = data as Order;

  return {
    ...raw,
    products: raw.products.map((p) => ({
      sku: p.sku,
      name: p.name,
      price: p.price,
      quantity: p.quantity,
      image_url: p.image_url,
    })),
  };
});
</script>

<template>
  <div>
    <AppBreadcrumb
      :items="[
        { label: 'Zamówienia', to: ROUTES.home },
        { label: order ? `#${order.id}` : '…' },
      ]"
    />

    <OrderContentSkeleton v-if="pending" />

    <ErrorAlert
      v-else-if="error"
      message="Nie znaleziono zamówienia."
      :back-to="ROUTES.home"
    />

    <template v-else-if="order">
      <div class="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 class="text-2xl font-bold mb-1">Zamówienie #{{ order.id }}</h1>
          <p class="text-sm text-gray-400 dark:text-gray-500">
            {{ formatDate(order.created_at) }}
          </p>
        </div>
        <div class="flex items-center gap-3">
          <StatusBadge :status="order.status" />
          <span class="text-xl font-bold tabular-nums">
            {{ formatPrice(order.total_price, order.payment.currency) }}
          </span>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6"
      >
        <OrderDetailContent :order="order" />
      </div>
    </template>
  </div>
</template>
