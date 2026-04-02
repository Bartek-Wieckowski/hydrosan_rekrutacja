<script setup lang="ts">
const client = useSupabaseClient();
</script>

<template>
  <!-- Toolbar -->
  <div class="flex items-center justify-between mb-4 gap-3">
    <!-- Filtr -->
    <div class="flex items-center gap-2">
      <div class="relative">
        <button
          class="flex items-center gap-1.5 text-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 transition-colors duration-150"
        >
          <Icon name="heroicons:funnel" class="w-4 h-4" />
          <span class="hidden sm:inline">Filtruj</span>
        </button>
      </div>
    </div>

    <!-- Prawy: licznik + toggle widoku -->
    <div class="flex items-center gap-3">
      <span class="text-sm text-gray-400 dark:text-gray-500">
        150 zamówień
      </span>
      <div
        class="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <button
          class="px-3 py-1.5 transition-colors duration-150 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <Icon name="heroicons:list-bullet" class="w-4 h-4" />
        </button>
        <button
          class="px-3 py-1.5 transition-colors duration-150 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <Icon name="heroicons:squares-2x2" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>

  <!-- Lista zamówień tabela -->
  <div class="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
    <!-- Header -->
    <div
      class="hidden sm:grid grid-cols-[5rem_1fr_1fr_8.125rem_8.125rem_3.25rem] gap-4 px-4 py-2.5 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide border-b border-gray-100 dark:border-gray-800 items-center"
    >
      <span>ID</span>
      <button
        class="flex items-center gap-1.5 uppercase tracking-wide font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-left"
      >
        Data
        <Icon
          name="heroicons:arrow-down"
          class="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
        />
      </button>
      <span>Klient</span>
      <div class="flex items-center gap-1.5">
        <span>Status</span>
        <button
          class="p-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <Icon name="heroicons:ellipsis-vertical" class="w-4 h-4" />
        </button>
      </div>
      <span class="text-right">Kwota</span>
    </div>

    <!-- Rows -->
    <div class="divide-y divide-gray-100 dark:divide-gray-800">
      <!-- Row 1 -->
      <div
        class="hidden sm:grid grid-cols-[5rem_1fr_1fr_8.125rem_8.125rem_3.25rem] gap-4 px-4 py-3 items-center bg-gray-50 dark:bg-gray-800/40 cursor-pointer"
      >
        <a
          class="text-blue-600 dark:text-blue-400 hover:underline font-mono text-sm font-medium"
        >
          #1022
        </a>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          13.03.2025 18:47
        </span>
        <span class="text-sm font-medium truncate"> Piotr Wiśniewski </span>
        <span
          class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 w-full justify-center"
        >
          Oczekujące
        </span>
        <span class="text-sm text-right font-medium tabular-nums">
          89,50 PLN
        </span>
        <button
          class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ml-auto"
        >
          <Icon name="heroicons:x-mark" class="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <!-- Expanded detail -->
      <div
        class="px-4 pt-4 pb-5 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800"
      >
        <!-- Tabs -->
        <div
          class="flex gap-0 border-b border-gray-200 dark:border-gray-700 mb-5 flex-wrap"
        >
          <button
            class="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors -mb-px md:border-b-2 md:border-blue-500 text-blue-600 dark:text-blue-400"
          >
            Klient
          </button>
          <button
            class="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors -mb-px text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Adres
          </button>
          <button
            class="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors -mb-px text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Płatność
          </button>
          <button
            class="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors -mb-px text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Produkty
          </button>
        </div>

        <!-- Tab content: Klient -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
              Imię i nazwisko
            </p>
            <p class="text-sm font-medium dark:text-white">Piotr Wiśniewski</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Email</p>
            <a class="text-sm font-medium dark:text-white hover:underline">
              piotr.w@example.com
            </a>
          </div>
          <div>
            <p class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
              Telefon
            </p>
            <a class="text-sm font-medium dark:text-white hover:underline">
              +48 500 600 700
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- lista zamówień kafelki -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      class="group relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 transition-shadow hover:shadow-md cursor-pointer"
    >
      <div class="flex items-center justify-between mb-2">
        <span
          class="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold"
        >
          #1024
        </span>
        <span
          class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        >
          Zrealizowane
        </span>
      </div>
      <p class="text-sm font-medium mb-0.5">Jan Kowalski</p>
      <p class="text-xs text-gray-400 dark:text-gray-500 mb-3">
        15.03.2025 14:32
      </p>
      <p class="text-sm font-semibold tabular-nums">1 249,99 PLN</p>

      <!-- Hover overlay -->
      <div
        class="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3"
      >
        <button
          class="p-2.5 bg-white/90 dark:bg-gray-800/90 rounded-xl hover:scale-105 transition-transform"
        >
          <div class="w-5 h-5 bg-gray-700 dark:bg-gray-300 rounded" />
        </button>
        <button
          class="p-2.5 bg-white/90 dark:bg-gray-800/90 rounded-xl hover:scale-105 transition-transform"
        >
          <div class="w-5 h-5 bg-gray-700 dark:bg-gray-300 rounded" />
        </button>
      </div>
    </div>
  </div>

  <!-- Paginacja -->
  <div class="mt-8">
    <div class="flex items-center justify-center gap-1.5">
      <button
        class="px-2.5 py-1.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-400"
      >
        Poprzednia
      </button>
      <button
        class="w-9 h-9 rounded-lg text-sm font-medium bg-teal-600 text-white"
      >
        1
      </button>
      <button
        class="w-9 h-9 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
      >
        2
      </button>
      <button
        class="w-9 h-9 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
      >
        3
      </button>
      <span class="px-1 text-gray-300 dark:text-gray-600">…</span>
      <button
        class="w-9 h-9 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
      >
        10
      </button>
      <button
        class="px-2.5 py-1.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
      >
        Następna
      </button>
    </div>
  </div>
</template>
