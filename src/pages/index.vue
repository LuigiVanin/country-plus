<script lang="ts" setup>
import CountryTable from "~/components/CountryTable.vue";
import { countryService } from "~/services/country-service";

const { pending, data } = useAsyncData(
  "region/americas", // NOTE: Temporarily disabling caching -
  () => countryService.fetchContriesFromAmericas(),
  {
    immediate: true,
    server: false,
  },
);

const tableColumns = [
  {
    key: "name",
    label: "name",
  },
];
</script>
<template>
  <PageTitle>
    <div class="flex items-center gap-2">
      <h1 class="text-lg font-semibold">Countries List</h1>
      <UIcon name="i-heroicons-chevron-right" />
      <UBadge variant="subtle" size="lg">Americas</UBadge>
    </div>
    <UButtonGroup>
      <UButton
        label="Search"
        icon="i-heroicons-magnifying-glass"
        variant="outline"
        to="/countries/search"
      />
      <UButton label="New Item" icon="i-heroicons-plus" to="/new-item" />
    </UButtonGroup>
  </PageTitle>
  <CountryTable :countries="data" :loading="pending" />
</template>
