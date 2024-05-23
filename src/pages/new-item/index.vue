<script lang="ts" setup>
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { cepService } from "~/services/cep-service";
import PageTitle from "~/components/PageTitle.vue";

const catRaces = ["Siamese", "Persian", "Sphynx", "Bengal", "StrayCat"];

const dogRaces = ["Bulldog", "Poodle", "Labrador", "Golden", "StrayDog"];

const toast = useToast();

const loading = ref(false);
const confirmationModalisOpen = ref(false);

const cepValidator = z
  .string()
  .min(0, "CEP is required")
  .regex(/^\d{5}-\d{3}$/, {
    message: "CEP must be in the format XXXXX-XXX",
  });

const schema = z.object({
  fullname: z
    .string()
    .min(0, "Name is required")
    .refine((val) => val.trim().split(" ").length > 1, {
      message: "More than one name is required",
    }),
  cpf: z
    .string()
    .min(0, "CPF is required")
    .min(11, "CPF must have 11 characters")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: "CPF must be in the format XXX.XXX.XXX-XX",
    }),
  type: z.enum(["cat", "dog"], {
    message: "Invalid type, it must be Dog or Cat",
  }),
  birthday: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, {
      message: "Birthday must be in the format DD/MM/YYYY",
    })
    .refine(
      (val) => {
        const [day, month, year] = val.split("/").map(Number);
        const date = new Date(year, month - 1, day);
        const now = new Date();
        const diff = now.getFullYear() - date.getFullYear();
        return diff >= 17 && diff <= 65;
      },
      { message: "The date must be between 18 and 65 years" },
    ),
  race: z.string().refine(
    (val) => {
      if (form.type === "cat") {
        return catRaces.includes(val);
      }

      return dogRaces.includes(val);
    },
    { message: "Invalid race" },
  ),
  cep: cepValidator,
  uf: z.string().optional(),
  bairro: z.string().optional(),
  location: z.string().optional(),
  city: z.string().optional(),
  salary: z.number().min(1000),
});

type Schema = z.output<typeof schema>;

const form = reactive<Schema>({
  fullname: "",
  birthday: "",
  cpf: "",
  type: "dog",
  race: dogRaces[0]!,
  cep: "",
  uf: "",
  bairro: "",
  salary: 1000,
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  if (!form.uf || !form.bairro || !form.location || !form.city) {
    try {
      await onCpfSubmit();
    } catch (e) {}
  }
  confirmationModalisOpen.value = true;
};

const onCpfSubmit = async () => {
  loading.value = true;
  try {
    const address = await cepService.fetchAddressFromCep(form.cep);

    form.uf = address.uf;
    form.bairro = address.bairro;
    form.location = address.logradouro;
    form.city = address.localidade;

    toast.add({
      title: "CEP founded",
      timeout: 3000,
      icon: "i-heroicons-check-badge",
      color: "green",
    });
  } catch (e) {
    toast.add({
      title: "CEP not found",
      timeout: 3000,
      icon: "i-heroicons-archive-box-x-mark",
      color: "red",
    });
  }
  loading.value = false;
};
</script>

<template>
  <UContainer class="!px-0">
    <PageTitle>
      <h1 class="text-xl font-semibold">Create New Item</h1>
      <UButton
        label="Back"
        variant="link"
        icon="i-heroicons-arrow-left"
        to="/"
      />
    </PageTitle>
    <UForm
      :schema="schema"
      :state="form"
      :validate-on="['submit']"
      class="flex flex-col gap-3"
      @submit="onSubmit"
    >
      <UFormGroup label="Full Name" name="fullname">
        <UInput v-model="form.fullname" type="text" />
      </UFormGroup>

      <div class="flex w-full flex-row gap-4">
        <UFormGroup label="CPF" name="cpf" class="flex-1">
          <UInput
            v-model="form.cpf"
            type="text"
            v-maska
            data-maska="###.###.###-##"
          />
        </UFormGroup>
        <UFormGroup label="Birthday" name="birthday" class="flex-1">
          <UInput
            v-model="form.birthday"
            type="text"
            v-maska
            data-maska="##/##/####"
          />
        </UFormGroup>
      </div>

      <UFormGroup label="Espécia" name="type">
        <USelect
          v-model="form.type"
          @change="
            () =>
              form.type === 'cat'
                ? (form.race = catRaces[0]!)
                : (form.race = dogRaces[0]!)
          "
          :options="[
            { label: 'Cat', value: 'cat' },
            { label: 'Dog', value: 'dog' },
          ]"
        />
      </UFormGroup>
      <UFormGroup label="Race" name="race">
        <USelect
          v-model="form.race"
          :options="form.type === 'cat' ? catRaces : dogRaces"
        />
      </UFormGroup>

      <UFormGroup label="Mountly Icome" name="salary">
        <UInput v-model="form.salary" type="number">
          <template #leading>
            <span class="font-bold text-gray-500">R$</span>
          </template>
        </UInput>
      </UFormGroup>

      <UFormGroup label="CEP" name="cep">
        <UButtonGroup orientation="horizontal" class="cep-button-group">
          <UInput
            v-model="form.cep"
            type="text"
            v-maska
            data-maska="#####-###"
            :disabled="loading"
          />
          <UTooltip class="!w-8" text="Search for CEP">
            <UButton
              icon="i-heroicons-magnifying-glass"
              color="gray"
              :loading="loading"
              @click="onCpfSubmit"
            />
          </UTooltip>
        </UButtonGroup>
      </UFormGroup>

      <div class="flex w-full flex-row gap-4">
        <UFormGroup label="UF" name="uf" class="flex-[0.6]">
          <UInput v-model="form.uf" type="text" :disabled="loading" />
        </UFormGroup>

        <UFormGroup label="City" name="city" class="flex-1">
          <UInput v-model="form.city" type="text" :disabled="loading" />
        </UFormGroup>
      </div>

      <div class="flex w-full flex-row gap-4">
        <UFormGroup label="Bairro" name="bairro" class="flex-[0.6]">
          <UInput v-model="form.bairro" type="text" :disabled="loading" />
        </UFormGroup>

        <UFormGroup label="Location" name="location" class="flex-1">
          <UInput v-model="form.location" type="text" :disabled="loading" />
        </UFormGroup>
      </div>

      <UContainer class="!mx-0 mt-5 flex justify-end !px-0">
        <UButton
          type="submit"
          color="primary"
          :loading="loading"
          ui="font-bold"
          size="lg"
          icon="i-heroicons-pencil-square"
        >
          Submit
        </UButton>
      </UContainer>
    </UForm>

    <ConfimationModal v-model="confirmationModalisOpen" :form-data="form" />
  </UContainer>
</template>

<style lang="scss">
.cep-button-group {
  width: 100%;

  > div {
    width: 100%;
  }
}
</style>
