<script setup lang="ts">
import type { Order } from "~/types";

defineProps<{ order: Order }>();

const activeTab = ref<TabKey>(TAB_KEYS.client);
const { show: showToast } = useToast();
const lightboxSrc = ref<string | null>(null);
const lightboxAlt = ref("");

const openLightbox = (src: string, alt: string) => {
  lightboxSrc.value = src;
  lightboxAlt.value = alt;
};

const closeLightbox = () => {
  lightboxSrc.value = null;
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") closeLightbox();
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <div>
    <div
      class="flex gap-0 border-b border-gray-200 dark:border-gray-700 mb-5 flex-wrap"
    >
      <button
        v-for="tab in TABS"
        :key="tab.key"
        :class="
          activeTab === tab.key
            ? 'md:border-b-2 md:border-blue-500 text-blue-600 dark:text-blue-400'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        "
        class="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors -mb-px"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Client tab -->
    <div
      v-if="activeTab === TAB_KEYS.client"
      class="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <DetailField
        :label="LABELS.fullName"
        :value="`${order.bill_name} ${order.bill_surname}`"
      />
      <DetailField
        :label="LABELS.email"
        :value="order.email_adress"
        :href="`mailto:${order.email_adress}`"
      />
      <DetailField
        :label="LABELS.phone"
        :value="order.bill_phone"
        :href="`tel:${order.bill_phone.replace(/\s/g, '')}`"
      />
    </div>

    <!-- Address tab -->
    <div
      v-else-if="activeTab === TAB_KEYS.address"
      class="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <div class="flex items-center gap-2">
        <DetailField :label="LABELS.street" :value="order.bill_street" />
        <p class="text-sm font-medium dark:text-white self-end">
          {{ order.bill_home_number }}
          {{ order.bill_flat_number ? ` / ${order.bill_flat_number}` : "" }}
        </p>
      </div>
      <DetailField :label="LABELS.postcode" :value="order.bill_postcode" />
      <DetailField :label="LABELS.city" :value="order.bill_city" />
    </div>

    <!-- Payment and delivery tab -->
    <div
      v-else-if="activeTab === TAB_KEYS.payment"
      class="grid grid-cols-2 gap-6"
    >
      <div class="space-y-4">
        <p
          class="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500"
        >
          Płatność
        </p>
        <DetailField :label="LABELS.method" :value="order.payment.name" />
        <DetailField
          :label="LABELS.paid"
          :value="
            formatPrice(Number(order.payment.paid), order.payment.currency)
          "
        />
        <div class="flex flex-col gap-1">
          <span class="text-xs text-gray-400 dark:text-gray-500">{{
            LABELS.status
          }}</span>
          <StatusBadge :status="order.payment.status" />
        </div>
      </div>
      <div class="space-y-4">
        <p
          class="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500"
        >
          Dostawa
        </p>
        <DetailField :label="LABELS.carrier" :value="order.shipment.name" />
        <DetailField
          :label="LABELS.cost"
          :value="
            formatPrice(Number(order.shipment.total), order.payment.currency)
          "
        />
      </div>
    </div>

    <!-- Products tab -->
    <div v-else-if="activeTab === TAB_KEYS.products" class="space-y-3">
      <div
        v-for="product in order.products"
        :key="product.sku"
        class="group/row flex gap-3 items-start p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
      >
        <button
          class="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center"
          :class="product.image_url ? 'cursor-zoom-in' : 'cursor-default'"
          :disabled="!product.image_url"
          @click="
            product.image_url && openLightbox(product.image_url, product.name)
          "
        >
          <NuxtImg
            v-if="product.image_url"
            :src="product.image_url"
            :alt="product.name"
            width="56"
            height="56"
            class="w-full h-full object-cover"
          />
          <Icon
            v-else
            name="heroicons:photo"
            class="w-5 h-5 text-gray-300 dark:text-gray-600"
          />
        </button>
        <div class="flex-1 min-w-0">
          <p
            class="text-sm font-medium leading-snug line-clamp-2 mb-0.5 dark:text-white md:group-hover/row:underline md:cursor-pointer"
            @click="
              showToast(
                `W tej sytuacji przeszlibyśmy do strony produktu.😉`,
                'warning',
              )
            "
          >
            {{ product.name }}
          </p>
          <p
            class="text-xs text-gray-400 dark:text-gray-500 font-mono dark:text-white/80"
          >
            {{ product.sku }}
          </p>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-sm font-semibold dark:text-white">
            {{ formatPrice(product.price) }}
          </p>
          <p class="text-xs text-gray-400 dark:text-gray-500">
            × {{ product.quantity }}
          </p>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightboxSrc"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          @click.self="closeLightbox"
        >
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div v-if="lightboxSrc" class="relative max-w-full max-h-full">
              <NuxtImg
                :src="lightboxSrc"
                :alt="lightboxAlt"
                class="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
              <button
                class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                @click="closeLightbox"
              >
                <Icon name="heroicons:x-mark" class="w-4 h-4" />
              </button>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
