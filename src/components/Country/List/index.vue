<script setup lang="ts">
import { twMerge } from "tailwind-merge";

type CountryListProps = {
  countries?: Country[];
  class?: string;
  loading?: boolean;
};

const props = defineProps<CountryListProps>();
</script>
<template>
  <template v-if="!loading">
    <p
      v-if="!props.countries"
      class="mt-8 w-full px-2 text-center text-gray-300 dark:text-gray-500"
    >
      <UIcon name="i-heroicons-map" class="h-6 w-6" />
      <br />
      There no country to be found yet... <br />
      You must type a name in the search bar to find a country.
    </p>
    <p
      v-else-if="!props.countries.length"
      class="mt-8 w-full px-2 text-center text-gray-300 dark:text-gray-500"
    >
      <UIcon name="i-heroicons-no-symbol" class="h-6 w-6" />
      <br />
      No country found with this name! <br />
      Try again with another name, please...
    </p>
  </template>
  <ul :class="twMerge(props.class || '', 'mt-5 flex flex-col gap-4')">
    <template v-if="props.loading">
      <li v-for="_ in 3">
        <USkeleton class="h-64 w-full" />
      </li>
    </template>
    <template v-else>
      <CountryListItem
        v-for="country in props.countries"
        :key="country.name.official"
        :country="country"
      >
        <slot :country="country" />
      </CountryListItem>
    </template>
  </ul>
</template>
