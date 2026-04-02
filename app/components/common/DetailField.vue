<script setup lang="ts">
defineProps<{ label: string; value: string; href?: string }>();
</script>

<template>
  <div>
    <p class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
      {{ label }}
    </p>
    <a
      v-if="href"
      :href="href"
      class="text-sm font-medium dark:text-white hover:underline"
    >
      {{ value }}
    </a>
    <p v-else class="text-sm font-medium dark:text-white">{{ value }}</p>
  </div>
</template>
