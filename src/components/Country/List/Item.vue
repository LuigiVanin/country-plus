<script setup lang="ts">
import { twMerge } from "tailwind-merge";

type CountryItemProps = {
  country: Country;
  class?: string;
};

const props = defineProps<CountryItemProps>();
</script>
<template>
  <li :class="twMerge(props.class || '', 'flex flex-col gap-4')">
    <slot :contry="props.country">
      <CountryCard :data="country" />
    </slot>
  </li>
</template>
