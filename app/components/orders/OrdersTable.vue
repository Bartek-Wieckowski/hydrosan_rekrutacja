<script setup lang="ts">
import type { Order } from "~/types";

const { orders, loading, sort, statusFilter } = defineProps<{
  orders: Order[];
  loading: boolean;
  sort: string;
  statusFilter: string;
}>();

const emit = defineEmits<{
  sort: [value: string];
  "filter-status": [value: string];
}>();

const expandedId = ref<number | null>(null);
const statusMenuOpen = ref(false);
const statusBtnRef = ref<HTMLElement | null>(null);
const dropdownPos = ref({ top: 0, left: 0 });

const toggle = (id: number) => {
  expandedId.value = expandedId.value === id ? null : id;
};

const toggleSort = () => {
  emit("sort", sort === "asc" ? "desc" : "asc");
};

const openStatusMenu = () => {
  if (statusBtnRef.value) {
    const rect = statusBtnRef.value.getBoundingClientRect();
    dropdownPos.value = { top: rect.bottom + 6, left: rect.left };
  }
  statusMenuOpen.value = true;
};

const applyStatus = (value: string) => {
  statusMenuOpen.value = false;
  emit("filter-status", value);
};
</script>

<template>
  <div class="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
    <OrdersTableSkeleton v-if="loading" />

    <template v-else>
      <!-- Headers table only desktop -->
      <div
        v-if="orders.length > 0"
        class="hidden sm:grid grid-cols-[5rem_1fr_1fr_8.125rem_8.125rem_3.25rem] gap-4 px-4 py-2.5 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide border-b border-gray-100 dark:border-gray-800 items-center"
      >
        <span>{{ ORDER_COLUMNS[0].label }}</span>
        <!-- Data with sorting -->
        <button
          class="flex items-center gap-1.5 uppercase tracking-wide font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-left"
          @click="toggleSort"
        >
          {{ ORDER_COLUMNS[1].label }}
          <Icon
            :name="
              sort === 'asc' ? 'heroicons:arrow-up' : 'heroicons:arrow-down'
            "
            class="w-3.5 h-3.5"
            :class="
              sort === 'asc'
                ? 'text-blue-500'
                : 'text-gray-400 dark:text-gray-500'
            "
          />
        </button>
        <span>{{ ORDER_COLUMNS[2].label }}</span>
        <!-- Status with dropdown filter -->
        <div class="flex items-center gap-1.5">
          <Teleport to="body">
            <div
              v-if="statusMenuOpen"
              class="fixed inset-0 z-40"
              @click="statusMenuOpen = false"
            />
            <div
              v-if="statusMenuOpen"
              class="fixed z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-2 w-44"
              :style="{
                top: dropdownPos.top + 'px',
                left: dropdownPos.left + 'px',
              }"
            >
              <p
                class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide px-1 mb-1.5"
              >
                Status
              </p>
              <div class="flex flex-col gap-1.5">
                <button
                  v-for="opt in ORDER_STATUS_OPTIONS"
                  :key="opt.value"
                  :class="
                    statusFilter === opt.value
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  "
                  class="w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors font-normal tracking-normal uppercase"
                  @click="applyStatus(opt.value)"
                >
                  {{ opt.label }}
                </button>
              </div>
            </div>
          </Teleport>
          <span
            :class="statusFilter ? 'text-blue-500 dark:text-blue-400' : ''"
            >{{ ORDER_COLUMNS[3].label }}</span
          >
          <button
            ref="statusBtnRef"
            class="p-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :class="
              statusFilter
                ? 'text-blue-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            "
            @click="openStatusMenu"
          >
            <Icon name="heroicons:ellipsis-vertical" class="w-4 h-4 flex" />
          </button>
        </div>
        <span class="text-right">{{ ORDER_COLUMNS[4].label }}</span>
      </div>

      <div class="divide-y divide-gray-100 dark:divide-gray-800">
        <template v-for="order in orders" :key="order.id">
          <!-- Mobile row -->
          <div
            class="flex sm:hidden items-stretch hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors cursor-pointer"
            @click="toggle(order.id)"
          >
            <div
              class="flex items-center gap-2 px-3 py-3 shrink-0 border-r border-gray-100 dark:border-gray-800"
            >
              <NuxtLink
                :to="`${ROUTES.orders.detail(order.id)}`"
                class="font-mono text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                @click.stop
              >
                #{{ order.id }}
              </NuxtLink>
              <button
                class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                @click.stop="toggle(order.id)"
              >
                <Icon
                  :name="
                    expandedId === order.id
                      ? 'heroicons:x-mark'
                      : 'heroicons:magnifying-glass'
                  "
                  class="w-3.5 h-3.5 text-gray-400"
                />
              </button>
            </div>
            <div
              class="overflow-x-auto flex flex-col md:flex-row items-center gap-4 px-3 py-3 min-w-0 w-full"
            >
              <div class="flex items-center justify-between w-full gap-1">
                <span
                  class="text-xs text-gray-400 dark:text-gray-500 text-left"
                  >{{ formatDate(order.created_at) }}</span
                >
                <span class="text-sm font-medium text-right"
                  >{{ order.bill_name }} {{ order.bill_surname }}</span
                >
              </div>
              <div class="flex items-center justify-between w-full gap-1">
                <StatusBadge :status="order.status" />
                <span class="text-sm font-semibold tabular-nums">{{
                  formatPrice(order.total_price, order.payment.currency)
                }}</span>
              </div>
            </div>
          </div>

          <!-- Desktop row -->
          <div
            class="hidden sm:grid grid-cols-[5rem_1fr_1fr_8.125rem_8.125rem_3.25rem] gap-4 px-4 py-3 items-center hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors cursor-pointer"
            @click="toggle(order.id)"
          >
            <NuxtLink
              :to="`${ROUTES.orders.detail(order.id)}`"
              class="text-blue-600 dark:text-blue-400 hover:underline font-mono text-sm font-medium"
              @click.stop
            >
              #{{ order.id }}
            </NuxtLink>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{
              formatDate(order.created_at)
            }}</span>
            <span class="text-sm font-medium truncate"
              >{{ order.bill_name }} {{ order.bill_surname }}</span
            >
            <StatusBadge :status="order.status" fixed />
            <span class="text-sm text-right font-medium tabular-nums">{{
              formatPrice(order.total_price, order.payment.currency)
            }}</span>
            <button
              class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ml-auto"
              @click.stop="toggle(order.id)"
            >
              <Icon
                :name="
                  expandedId === order.id
                    ? 'heroicons:x-mark'
                    : 'heroicons:magnifying-glass'
                "
                class="w-4 h-4 text-gray-400"
              />
            </button>
          </div>

          <Transition
            enter-active-class="transition-all duration-200 ease-out overflow-hidden"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-[40rem]"
            leave-active-class="transition-all duration-150 ease-in overflow-hidden"
            leave-from-class="opacity-100 max-h-[40rem]"
            leave-to-class="opacity-0 max-h-0"
          >
            <div
              v-if="expandedId === order.id"
              class="px-4 pt-4 pb-5 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800"
            >
              <OrderDetailContent :order="order" />
            </div>
          </Transition>
        </template>
      </div>
    </template>
  </div>
</template>
