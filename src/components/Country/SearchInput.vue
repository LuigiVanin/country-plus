<script setup lang="ts">
import { z } from "zod";

type CountrySearchInputProps = {
  modelValue: string;
  loading?: boolean;
};
const props = defineProps<CountrySearchInputProps>();

const emit = defineEmits(["submit", "update:modelValue"]);

const isMounted = ref(false);

const schema = z.object({
  modelValue: z
    .string()
    .min(3, "The search term must have at least 3 characters"),
});

onMounted(() => {
  // NOTE: prevent the form from being rendered before the component is mounted - hidration missmatch
  isMounted.value = true;
});
</script>

<template>
  <UForm
    v-if="isMounted"
    class="country-search-form"
    :schema="schema"
    :state="{ modelValue: props.modelValue }"
    @submit="emit('submit')"
  >
    <UFormGroup name="modelValue">
      <UButtonGroup
        orientation="horizontal"
        class="country-search-group shadow-md shadow-indigo-200 transition-all duration-200 dark:shadow-indigo-900"
      >
        <UInput
          type="text"
          size="xl"
          placeholder="Search a country by its name..."
          :model-value="props.modelValue"
          @update:modelValue="emit('update:modelValue', $event)"
        />
        <UButton
          label="Search"
          icon="i-heroicons-magnifying-glass"
          variant="solid"
          color="primary"
          type="submit"
          :loading="props.loading"
        />
      </UButtonGroup>
    </UFormGroup>
  </UForm>
</template>

<style lang="scss">
.country-search-group {
  width: 100%;

  > div {
    width: 100%;
  }
}

.country-search-form {
  animation: fade-in 0.3s ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    height: 0;
  }

  to {
    opacity: 1;
    height: 45px;
  }
}
</style>
