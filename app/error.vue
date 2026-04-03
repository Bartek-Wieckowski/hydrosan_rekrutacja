<script setup lang="ts">
import type { NuxtError } from "#app";

const { error } = defineProps<{ error: NuxtError }>();

const is404 = computed(() => error.status === 404);

const title = computed(() =>
  is404.value ? "404" : String(error.status || 500),
);

const message = computed(() =>
  is404.value
    ? "Strona, której szukasz nie istnieje lub została przeniesiona."
    : "Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.",
);

const handleBack = () => clearError({ redirect: "/" });

onMounted(() => {
  const saved = localStorage.getItem("theme");
  document.documentElement.classList.toggle("dark", saved === "dark");
});
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex items-center justify-center px-4"
  >
    <div class="text-center max-w-md">
      <p class="text-7xl font-bold text-rose-400">
        {{ title }}
      </p>
      <h1 class="mt-4 text-xl font-semibold">
        {{ is404 ? "Nie znaleziono strony" : "Coś poszło nie tak" }}
      </h1>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {{ message }}
      </p>
      <div class="mt-8 flex items-center justify-center gap-3">
        <button
          class="px-5 py-2.5 text-sm font-medium rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors"
          @click="handleBack"
        >
          Wróć do zamówień
        </button>
        <button
          v-if="!is404"
          class="px-5 py-2.5 text-sm font-medium rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          @click="reloadNuxtApp({ force: true })"
        >
          Odśwież stronę
        </button>
      </div>
    </div>
  </div>
</template>
