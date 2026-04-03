<script setup lang="ts">
defineProps<{
  items: { label: string; to?: string }[];
}>();
</script>

<template>
  <div
    class="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 mb-6"
  >
    <template v-for="(item, index) in items" :key="index">
      <Icon
        v-if="index > 0"
        name="heroicons:chevron-right"
        class="w-3.5 h-3.5"
      />
      <NuxtLink
        v-if="item.to"
        :to="item.to"
        class="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else class="text-gray-700 dark:text-gray-300 font-medium">
        {{ item.label }}
      </span>
    </template>
  </div>
</template>
