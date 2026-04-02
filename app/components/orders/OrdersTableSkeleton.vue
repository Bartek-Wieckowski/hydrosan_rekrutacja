<template>
  <div class="divide-y divide-gray-100 dark:divide-gray-800">
    <div
      v-for="i in 15"
      :key="i"
      class="flex gap-4 px-4 py-3.5 animate-pulse bg-gray-600"
    >
      <div class="h-8 bg-gray-100 dark:bg-gray-800 rounded w-10 shrink-0" />
      <div class="h-8 bg-gray-100 dark:bg-gray-800 rounded w-36 shrink-0" />
      <div class="h-8 bg-gray-100 dark:bg-gray-800 rounded flex-1" />
      <div class="h-8 bg-gray-100 dark:bg-gray-800 rounded w-20 shrink-0" />
      <div class="h-8 bg-gray-100 dark:bg-gray-800 rounded w-24 shrink-0" />
    </div>
  </div>
</template>
