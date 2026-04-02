<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="i in 15"
      :key="i"
      class="bg-gray-600 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 animate-pulse"
    >
      <div class="flex justify-between mb-3">
        <div class="h-3 bg-gray-100 dark:bg-gray-800 rounded w-10" />
        <div class="h-5 bg-gray-100 dark:bg-gray-800 rounded w-20" />
      </div>
      <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-36 mb-2" />
      <div class="h-3 bg-gray-100 dark:bg-gray-800 rounded w-28 mb-4" />
      <div class="h-6 bg-gray-100 dark:bg-gray-800 rounded w-24" />
    </div>
  </div>
</template>
