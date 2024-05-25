<script lang="ts" setup>
import { useFetchCountriesFromAmerica } from "~/composables/api/useFetchCountriesFromAmerica";

const { pending, countries } = useFetchCountriesFromAmerica();
</script>
<template>
  <PageTitle>
    <div class="flex items-center gap-2">
      <h1 class="text-lg font-semibold">Countries</h1>
      <UIcon name="i-heroicons-chevron-right" />
      <UBadge variant="subtle" size="lg">Americas</UBadge>
    </div>
    <UButtonGroup class="hidden sm:flex">
      <UButton
        label="Search"
        icon="i-heroicons-magnifying-glass"
        variant="outline"
        to="/countries/search"
      />
      <UButton label="New Item" icon="i-heroicons-plus" to="/new-item" />
    </UButtonGroup>
  </PageTitle>
  <CountryTable :countries="countries" :loading="pending" />
</template>
