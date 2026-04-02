<script setup lang="ts">
const { id } = useRoute().params;
</script>

<template>
  <div>
    <!-- Breadcrumb -->
    <div
      class="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 mb-6"
    >
      <a class="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
        Zamówienia
      </a>
      <Icon name="heroicons:chevron-right" class="w-3.5 h-3.5" />
      <span class="text-gray-700 dark:text-gray-300 font-medium"> #1024 </span>
    </div>

    <!-- Header -->
    <div class="flex flex-wrap items-start justify-between gap-3 mb-6">
      <div>
        <h1 class="text-2xl font-bold mb-1">Zamówienie #1024</h1>
        <p class="text-sm text-gray-400 dark:text-gray-500">15.03.2025 14:32</p>
      </div>
      <div class="flex items-center gap-3">
        <span
          class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        >
          Zrealizowane
        </span>
        <span class="text-xl font-bold tabular-nums"> 1 249,99 PLN </span>
      </div>
    </div>

    <!-- Content card -->
    <div
      class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6"
    >
      <!-- Tabs -->
      <div
        class="flex gap-0 border-b border-gray-200 dark:border-gray-700 mb-5 flex-wrap"
      >
        <button
          class="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors -mb-px text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          Klient
        </button>
        <button
          class="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors -mb-px text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          Adres
        </button>
        <button
          class="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors -mb-px md:border-b-2 md:border-blue-500 text-blue-600 dark:text-blue-400"
        >
          Płatność
        </button>
        <button
          class="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors -mb-px text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          Produkty
        </button>
      </div>

      <!-- Tab: Płatność i dostawa -->
      <div class="grid grid-cols-2 gap-6">
        <div class="space-y-4">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500"
          >
            Płatność
          </p>
          <div>
            <p class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
              Metoda
            </p>
            <p class="text-sm font-medium dark:text-white">Przelew</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
              Zapłacono
            </p>
            <p class="text-sm font-medium dark:text-white">1 249,99 PLN</p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-xs text-gray-400 dark:text-gray-500">
              Status
            </span>
            <span
              class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 self-start"
            >
              Opłacone
            </span>
          </div>
        </div>
        <div class="space-y-4">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500"
          >
            Dostawa
          </p>
          <div>
            <p class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
              Kurier
            </p>
            <p class="text-sm font-medium dark:text-white">GEODIS</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Koszt</p>
            <p class="text-sm font-medium dark:text-white">179,99 PLN</p>
          </div>
        </div>
      </div>
    </div>

    <!--  tab: Produkty -->

    <div class="space-y-3">
      <div
        class="group/row flex gap-3 items-start p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
      >
        <button
          class="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center cursor-zoom-in"
        >
          <img
            src="https://imge.pl/p/315838/n/064c9c7f7bfa70fd9b225c397a9e27d7.jpg"
            alt="Zlew"
            class="w-full h-full object-cover"
          />
        </button>
        <div class="flex-1 min-w-0">
          <p
            class="text-sm font-medium leading-snug line-clamp-2 mb-0.5 dark:text-white"
          >
            ZLEW KUCHENNY
          </p>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-sm font-semibold dark:text-white">416,49 PLN</p>
          <p class="text-xs text-gray-400 dark:text-gray-500">× 1</p>
        </div>
      </div>

      <div
        class="group/row flex gap-3 items-start p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
      >
        <div
          class="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center"
        >
          <Icon
            name="heroicons:photo"
            class="w-5 h-5 text-gray-300 dark:text-gray-600"
          />
        </div>
        <div class="flex-1 min-w-0">
          <p
            class="text-sm font-medium leading-snug line-clamp-2 mb-0.5 dark:text-white"
          >
            UCHWYTY MONTAŻOWE
          </p>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-sm font-semibold dark:text-white">8,52 PLN</p>
          <p class="text-xs text-gray-400 dark:text-gray-500">× 1</p>
        </div>
      </div>
    </div>
  </div>
</template>
