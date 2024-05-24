<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue", "confirm-breed-name"]);

const breed = ref("");

const updateModelValue = (value: boolean) => {
  emit("update:modelValue", value);
};

const confirmNewBreedName = () => {
  emit("confirm-breed-name", breed.value);
  updateModelValue(false);
  breed.value = "";
};
</script>

<template>
  <UModal
    :model-value="props.modelValue"
    @update:model-value="updateModelValue"
    class="!items-center"
  >
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <h1 class="font-bold">Other Animal Breed</h1>
      </template>

      <UInput
        v-model="breed"
        label="Breed"
        placeholder="Enter the breed of the animal"
      />

      <div class="mt-6 flex justify-end space-x-4">
        <UButton variant="ghost" @click="updateModelValue(false)"
          >Cancel</UButton
        >
        <UButton
          type="submit"
          color="primary"
          icon="i-heroicons-check-badge"
          :loading="confirmationLoading"
          @click="confirmNewBreedName"
        >
          Confirm
        </UButton>
      </div>
    </UCard>
  </UModal>
</template>
