<script setup lang="ts">
defineProps<{ message: string; backTo?: string }>();
</script>

<template>
  <div
    class="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-red-700 dark:text-red-400 text-sm"
  >
    <p>{{ message }}</p>
    <NuxtLink
      v-if="backTo"
      :to="backTo"
      class="inline-block mt-3 px-4 py-2 text-sm font-medium bg-red-100 dark:bg-red-900/30 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
    >
      Wróć do listy zamówień
    </NuxtLink>
    <button
      v-else
      class="mt-3 px-4 py-2 text-sm font-medium bg-red-100 dark:bg-red-900/30 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
      @click="reloadNuxtApp({ force: true })"
    >
      Spróbuj ponownie
    </button>
  </div>
</template>
