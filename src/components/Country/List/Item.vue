<script setup lang="ts">
import { twMerge } from "tailwind-merge";

type CountryItemProps = {
  country: Country;
  class?: string;
};

const props = defineProps<CountryItemProps>();
</script>
<template>
  <li
    :class="twMerge(props.class || '', 'flex flex-col gap-4')"
    :data-country-name="country.name.common.toLowerCase().replace(' ', '-')"
  >
    <slot :contry="props.country" />
  </li>
</template>
