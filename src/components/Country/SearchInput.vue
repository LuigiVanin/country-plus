<script setup lang="ts">
import { z } from "zod";

type CountrySearchInputProps = {
  modelValue: string;
  loading?: boolean;
};
const props = defineProps<CountrySearchInputProps>();

const emit = defineEmits(["submit", "update:modelValue"]);

const schema = z.object({
  modelValue: z
    .string()
    .min(3, "The search term must have at least 3 characters"),
});
</script>

<template>
  <UForm
    :schema="schema"
    :state="{ modelValue: props.modelValue }"
    @submit="emit('submit')"
  >
    <UFormGroup name="modelValue">
      <UButtonGroup
        orientation="horizontal"
        class="country-search-group shadow-md shadow-indigo-400 transition-all duration-200"
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
</style>
