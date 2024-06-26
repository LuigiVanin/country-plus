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
    back-button
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
  </PageTitle>
  <div class="mt-8 flex w-full flex-col gap-4 sm:px-4 md:px-10 lg:px-20">
    <CountrySearchInput
      v-model="search"
      :loading="status === 'pending'"
      @submit="handleSearch"
    />
    <template v-if="status !== 'pending'">
      <p
        v-if="!countries"
        class="mt-10 w-full px-2 text-center text-gray-300 dark:text-gray-500"
      >
        <UIcon name="i-heroicons-map" class="h-6 w-6" />
        <br />
        There no country to be found yet... <br />
        You must type a name in the search bar to find a country.
      </p>
      <p
        v-else-if="!countries?.length"
        class="mt-10 w-full px-2 text-center text-gray-300 dark:text-gray-500"
      >
        <UIcon name="i-heroicons-no-symbol" class="h-6 w-6" />
        <br />
        No country found with this name! <br />
        Try again with another name, please...
      </p>
    </template>
    <CountryList :countries="countries" :loading="status === 'pending'">
      <template #default="{ country }">
        <CountryCard :data="country" />
      </template>
    </CountryList>
    <ul></ul>
  </div>
</template>
