<script lang="ts" setup>
type PageTitleProps = {
  title?: string;
  description?: string;
};

const props = defineProps<PageTitleProps>();
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-between">
      <slot>
        <h1 class="text-lg font-semibold">{{ props.title }}</h1>
      </slot>
    </div>
    <p v-if="props.description" class="text-sm font-light text-gray-400">
      {{ props.description }}
    </p>
  </div>
  <UDivider
    class="my-4"
    :ui="{ border: { base: 'border-gray-200 dark:border-gray-700' } }"
  />
</template>
