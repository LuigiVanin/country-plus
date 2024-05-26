<script lang="ts" setup>
const { isDark, toggleTheme } = useTheme();
</script>
<template>
  <header
    class="from-primary-100/90 dark:from-primary-900/80 to-120% fixed z-50 flex h-12 w-full border-b-[1px] border-solid border-gray-200 bg-gradient-to-b to-transparent px-6 backdrop-blur-sm dark:border-gray-700"
  >
    <div
      class="mx-auto flex w-full max-w-[1440px] items-center justify-between !px-0"
    >
      <h1 class="flex items-center gap-1 text-lg font-bold">
        <UIcon
          name="i-heroicons-globe-europe-africa mb-[1px]"
          class="h-6 w-6"
        />
        <span> Country+ </span>
      </h1>

      <ClientOnly>
        <UButton
          :icon="
            isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
          "
          data-testid="theme-button"
          color="gray"
          variant="ghost"
          aria-label="Theme"
          @click="toggleTheme"
        />
        <template #fallback>
          <div class="h-8 w-8" />
        </template>
      </ClientOnly>
    </div>
  </header>
</template>
