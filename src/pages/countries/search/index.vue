<script lang="ts" setup>
import { useSearchCountryByName } from "~/composables/api/useSearchCountriesByName";

const router = useRouter();
const search = ref("");
const toast = useToast();

const {
  search: searchCountries,
  clear,
  status,
  error,
  countries,
} = useSearchCountryByName(search);

const handleSearch = async () => {
  clear();
  await searchCountries();
  if (error.value && status.value !== "success") {
    toast.add({
      icon: "i-heroicons-archive-box-x-mark",
      title: "Error! Could not find coutries by name",
      color: "red",
    });
  }
};
</script>

<template>
  <PageTitle
    description="Search contries by its name. Any Country with a similar name will be found by this application"
  >
    <div class="flex items-center gap-2">
      <NuxtLink
        to="/"
        class="hover:text-primary hover:underline hover:underline-offset-4"
      >
        <h1 class="text-lg font-semibold">Countries</h1>
      </NuxtLink>
      <UIcon name="i-heroicons-chevron-right" />
      <h1 class="text-lg font-semibold">Search</h1>
    </div>
    <UButton
      label="Back"
      variant="link"
      icon="i-heroicons-arrow-left"
      @click="router.go(-1)"
    />
  </PageTitle>
  <div class="mt-8 flex w-full flex-col gap-4 sm:px-4 md:px-10 lg:px-20">
    <CountrySearchInput
      v-model="search"
      :loading="status === 'pending'"
      @submit="handleSearch"
    />
    <CountryList :countries="countries" :loading="status === 'pending'">
      <template #default="{ country }">
        <CountryCard :data="country" />
      </template>
    </CountryList>
    <ul></ul>
  </div>
</template>
