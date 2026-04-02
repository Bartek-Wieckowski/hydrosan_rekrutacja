<script setup lang="ts">
const { sort, statusSlug } = defineProps<{
  sort: string;
  statusSlug: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  change: [params: Record<string, string | number>];
}>();

const isOpen = ref(false);

const hasActive = computed(() => !!statusSlug || sort !== "desc");

const apply = (params: Record<string, string | number>) => {
  isOpen.value = false;
  emit("change", params);
};
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-40" @click="isOpen = false" />
  </Teleport>

  <div class="flex items-center gap-2">
    <div class="relative">
      <button
        :class="
          hasActive
            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
        "
        class="flex items-center gap-1.5 text-sm border rounded-lg px-3 py-2 bg-white dark:bg-gray-900 transition-colors duration-150"
        @click="isOpen = !isOpen"
      >
        <Icon name="heroicons:funnel" class="w-4 h-4" />
        <span class="hidden sm:inline">Filtruj</span>
        <span v-if="hasActive" class="w-1.5 h-1.5 rounded-full bg-blue-500" />
      </button>

      <div
        v-if="isOpen"
        class="absolute top-full left-0 mt-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-3 z-50 w-[15rem]"
      >
        <p
          class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2"
        >
          Sortowanie
        </p>
        <div class="flex gap-1 mb-3">
          <button
            :class="
              sort === 'desc'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            "
            class="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs border rounded-lg transition-colors"
            @click="apply({ sort: 'desc', page: 1 })"
          >
            <Icon name="heroicons:arrow-down" class="w-3 h-3" />
            Najnowsze
          </button>
          <button
            :class="
              sort === 'asc'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            "
            class="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs border rounded-lg transition-colors"
            @click="apply({ sort: 'asc', page: 1 })"
          >
            <Icon name="heroicons:arrow-up" class="w-3 h-3" />
            Najstarsze
          </button>
        </div>

        <p
          class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"
        >
          Status
        </p>
        <div class="flex flex-col gap-0.5">
          <button
            v-for="opt in ORDER_STATUS_OPTIONS"
            :key="opt.value"
            :class="
              statusSlug === opt.slug
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            "
            class="w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors uppercase"
            @click="apply({ status: opt.slug, page: 1 })"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>
    <AppLoader v-if="loading" />
  </div>
</template>
