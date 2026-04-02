<script setup lang="ts">
const { toasts } = useToast();
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none"
    >
      <TransitionGroup
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-3 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-3 scale-95"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium backdrop-blur-sm pointer-events-auto max-w-md"
          :class="{
            'bg-gray-900/90 text-white dark:bg-white/90 dark:text-gray-900':
              toast.type === 'info',
            'bg-emerald-500/90 text-white': toast.type === 'success',
            'bg-amber-500/90 text-white': toast.type === 'warning',
          }"
        >
          <Icon
            :name="
              toast.type === 'info'
                ? 'heroicons:information-circle'
                : toast.type === 'success'
                  ? 'heroicons:check-circle'
                  : 'heroicons:exclamation-triangle'
            "
            class="w-4 h-4 flex-shrink-0"
          />
          {{ toast.message }}
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
