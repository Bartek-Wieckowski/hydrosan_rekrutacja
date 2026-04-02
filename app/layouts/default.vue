<script setup lang="ts">
const { isDark, init: initTheme, toggle: toggleTheme } = useTheme();
const { init: initView } = useViewMode();

onMounted(() => {
  initTheme();
  initView();
});
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200"
  >
    <header
      class="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-colors duration-200"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between"
      >
        <NuxtLink
          :to="ROUTES.home"
          class="font-semibold text-base tracking-tight hover:opacity-75 transition-opacity"
        >
          <NuxtImg
            src="logo-hydrosan(2).png"
            alt="Logo"
            width="80"
            height="45"
          />
        </NuxtLink>
        <button
          class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
          aria-label="Przełącz motyw"
          @click="toggleTheme"
        >
          <Icon
            :name="isDark ? 'heroicons:sun' : 'heroicons:moon'"
            class="w-5 h-5"
          />
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <slot />
    </main>
    <AppToast />
  </div>
</template>
