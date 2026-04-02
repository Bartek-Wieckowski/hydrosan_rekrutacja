<script setup lang="ts">
const { status, fixed = false } = defineProps<{
  status: string;
  fixed?: boolean;
}>();

const COLOR_CLASSES: Record<string, string> = {
  green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  yellow:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  gray: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

const ALL_STATUSES: Record<string, { label: string; color: string }> = {
  ...ORDER_STATUS,
  ...PAYMENT_STATUS,
};

const badge = computed(() => {
  const found = ALL_STATUSES[status];
  return {
    label: found?.label ?? status,
    classes: COLOR_CLASSES[found?.color ?? "gray"],
  };
});

const isLong = computed(() => badge.value.label.length > 20);
</script>

<template>
  <span
    :class="[
      badge.classes,
      fixed ? 'w-full justify-center' : 'self-start',
      isLong ? 'text-[0.563rem]' : 'text-xs',
    ]"
    class="inline-flex items-center px-2 py-0.5 rounded-full font-medium text-center uppercase"
  >
    {{ badge.label }}
  </span>
</template>
