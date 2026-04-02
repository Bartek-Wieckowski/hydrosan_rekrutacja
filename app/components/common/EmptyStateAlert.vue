<script setup lang="ts">
defineProps<{
  icon: string;
  message: string;
}>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center py-20 text-gray-300 dark:text-gray-600"
  >
    <Icon :name="icon" class="w-12 h-12 mb-3" />
    <p class="text-sm">{{ message }}</p>
  </div>
</template>
