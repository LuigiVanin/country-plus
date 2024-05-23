<script lang="ts" setup>
type Schema = {
  fullname: string;
  type: "cat" | "dog";
  cpf: string;
  race: string;
  cep: string;
  uf?: string | undefined;
  bairro?: string | undefined;
  location?: string | undefined;
  city?: string | undefined;
};

const props = defineProps<{
  modelValue: boolean;
  formData: Schema;
}>();

const emit = defineEmits(["update:modelValue"]);
const router = useRouter();

const confirmationLoading = ref(false);

const updateModelValue = (value: boolean) => {
  emit("update:modelValue", value);
};

const confirmForm = () => {
  confirmationLoading.value = true;
  setTimeout(() => {
    confirmationLoading.value = false;
    updateModelValue(false);
    router.push("/");
  }, 2000);
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
        <h1 class="font-bold">Info Confirmation</h1>
      </template>

      <div class="flex flex-col gap-3 p-0">
        <p><strong>Name:</strong> {{ props.formData.fullname }}</p>
        <p><strong>CPF:</strong> {{ props.formData.cpf }}</p>
        <p>
          <strong class="mr-2">Type:</strong>
          <UBadge variant="subtle" color="green" class="capitalize">
            {{ props.formData.type }}
          </UBadge>
        </p>
        <p>
          <strong class="mr-2">Race: </strong>
          <UBadge variant="subtle" class="capitalize">
            {{ props.formData.race }}
          </UBadge>
        </p>

        <p><strong class="mr-2">CEP:</strong> {{ props.formData.cep }}</p>
        <div class="flex flex-row gap-3">
          <p><strong class="mr-2">UF:</strong> {{ props.formData.uf }}</p>
          <p><strong class="mr-2">City:</strong> {{ props.formData.city }}</p>
          <p>
            <strong class="mr-2">Bairro:</strong> {{ props.formData.bairro }}
          </p>
        </div>
        <p>
          <strong class="mr-2">Location:</strong> {{ props.formData.location }}
        </p>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-4">
          <UButton variant="ghost" @click="updateModelValue(false)"
            >Cancel</UButton
          >
          <UButton
            color="primary"
            icon="i-heroicons-check-badge"
            :loading="confirmationLoading"
            @click="confirmForm"
          >
            Confirm
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
