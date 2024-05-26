<script lang="ts" setup>
type PageTitleProps = {
  title?: string;
  backButton?: boolean;
  description?: string;
};

const props = defineProps<PageTitleProps>();

const router = useRouter();
</script>

<template>
  <div class="flex flex-col gap-2" data-testid="page-title">
    <div class="flex flex-col-reverse justify-between gap-2 sm:flex-row">
      <slot>
        <h1 class="text-md font-semibold sm:text-lg">{{ props.title }}</h1>
      </slot>
      <UButton
        v-if="props.backButton"
        label="Back"
        variant="link"
        icon="i-heroicons-arrow-left"
        :padded="false"
        @click="router.go(-1)"
      />
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
