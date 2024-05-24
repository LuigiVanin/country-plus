<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

const { y } = useWindowScroll();

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <ClientOnly>
    <UButton
      icon="i-heroicons-arrow-up"
      size="lg"
      :ui="{ variant: { solid: 'shadow-lg' } }"
      :class="
        twMerge(
          'pointer-events-none fixed bottom-5 right-6 translate-y-10 scale-50 opacity-0 transition-all duration-200 ease-out',
          y > 300 &&
            'pointer-events-auto translate-y-0 scale-[1] opacity-60 hover:opacity-100',
        )
      "
      square
      @click="scrollToTop"
    />
  </ClientOnly>
</template>
