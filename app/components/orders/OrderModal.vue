<script setup lang="ts">
import type { Order } from "~/types";

defineProps<{ order: Order }>();
const emit = defineEmits<{ close: [] }>();

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    emit("close");
  }
};

onMounted(() => document.addEventListener("keydown", onKeydown));
onUnmounted(() => document.removeEventListener("keydown", onKeydown));
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.95, y: 8 }"
        :enter="{
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 200 },
        }"
        class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0"
        >
          <div>
            <p class="font-mono text-xs text-gray-400 dark:text-gray-500">
              #{{ order.id }}
            </p>
            <h2 class="font-semibold text-base dark:text-white">
              {{ order.bill_name }} {{ order.bill_surname }}
            </h2>
          </div>
          <button
            class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            @click="emit('close')"
          >
            <Icon name="heroicons:x-mark" class="w-5 h-5 dark:bg-white" />
          </button>
        </div>

        <!-- Content -->
        <div class="overflow-y-auto p-6">
          <OrderDetailContent :order="order" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
