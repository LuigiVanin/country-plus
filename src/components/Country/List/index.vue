<script setup lang="ts">
import { twMerge } from "tailwind-merge";

type CountryListProps = {
  countries?: Country[] | null;
  class?: string;
  loading?: boolean;
};

const props = defineProps<CountryListProps>();
</script>
<template>
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
