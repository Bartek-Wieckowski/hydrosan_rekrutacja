<script setup lang="ts">
const { page, totalPages, visiblePages } = defineProps<{
  page: number;
  totalPages: number;
  visiblePages: number[];
}>();

const emit = defineEmits<{ change: [page: number] }>();

const route = useRoute();
const firstVisible = computed(() => visiblePages[0] ?? 2);
const lastVisible = computed(
  () => visiblePages[visiblePages.length - 1] ?? totalPages - 1,
);

const goToPage = (input: HTMLInputElement) => {
  const p = parseInt(input.value);
  if (!p || p < 1 || p > totalPages) return;
  input.value = "";
  navigateTo({ query: { ...route.query, page: p } });
};
</script>

<template>
  <div class="flex items-center justify-center gap-1 h-[6.25rem]">
    <button
      :disabled="page === 1"
      class="flex items-center gap-1.5 px-3 h-9 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 disabled:opacity-30 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
      @click="emit('change', page - 1)"
    >
      <Icon name="heroicons:chevron-left" class="w-4 h-4" />
      <span class="hidden sm:inline">Poprzednia</span>
    </button>

    <div class="flex items-center gap-1 mx-1">
      <button
        :class="
          page === 1
            ? 'bg-teal-600 text-white shadow-sm scale-105'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
        "
        class="w-9 h-9 rounded-full text-sm font-medium transition-all duration-150"
        @click="emit('change', 1)"
      >
        1
      </button>

      <span
        v-if="firstVisible > 2"
        class="w-4 text-center text-gray-300 dark:text-gray-600 text-xs select-none"
        >…</span
      >

      <button
        v-for="p in visiblePages"
        :key="p"
        :class="
          p === page
            ? 'bg-teal-600 text-white shadow-sm scale-105'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
        "
        class="w-9 h-9 rounded-full text-sm font-medium transition-all duration-150"
        @click="emit('change', p)"
      >
        {{ p }}
      </button>

      <span
        v-if="lastVisible < totalPages - 1"
        class="w-4 text-center text-gray-300 dark:text-gray-600 text-xs select-none"
        >…</span
      >

      <button
        v-if="totalPages > 1"
        :class="
          page === totalPages
            ? 'bg-teal-600 text-white shadow-sm scale-105'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
        "
        class="w-9 h-9 rounded-full text-sm font-medium transition-all duration-150"
        @click="emit('change', totalPages)"
      >
        {{ totalPages }}
      </button>
    </div>

    <button
      :disabled="page === totalPages"
      class="flex items-center gap-1.5 px-3 h-9 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 disabled:opacity-30 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
      @click="emit('change', page + 1)"
    >
      <span class="hidden sm:inline">Następna</span>
      <Icon name="heroicons:chevron-right" class="w-4 h-4" />
    </button>
  </div>
  <div class="flex items-center justify-center gap-2">
    <input
      type="number"
      :min="1"
      :max="totalPages"
      placeholder="Idź do..."
      class="w-20 h-9 rounded-full text-sm text-center border border-gray-200 dark:border-gray-700 bg-transparent text-gray-600 dark:text-gray-400 focus:outline-none focus:border-teal-600"
      @keydown.enter="goToPage($event.target as HTMLInputElement)"
    />
  </div>
</template>
