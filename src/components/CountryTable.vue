<script lang="ts" setup>
import type { _maxHeight } from "#tailwind-config/theme";

type CountryTableProps = {
  countries?: Country[] | null;
  loading: boolean;
};

const props = defineProps<CountryTableProps>();

const router = useRouter();

const formatItems = (items: string[]) => {
  let result = "";
  items.forEach((item, index) => {
    result += item;
    if (index == items.length - 1) return;
    if (index === items.length - 2) result += " and ";
    else result += ", ";
  });

  return result;
};

const countryRows = computed(() => {
  if (!props.countries) return [];

  return props.countries.map((country) => {
    return {
      name: country.name.official || country.name.official,
      flag: country.flags.svg,
      capital: country.capital[0] || "no capital",
      languages: Object.values(country.languages),
      subregion: country.subregion,
      link: country.maps.googleMaps,
    };
  });
});

const contryTableColumns = [
  {
    key: "name",
    label: "Name",
    sortable: true,
    direction: "desc" as const,
  },
  {
    key: "capital",
    label: "Capital",
  },
  {
    key: "subregion",
    label: "Subregion",
    sortable: true,
    direction: "desc" as const,
  },
  {
    key: "languages",
    label: "Languages",
  },
  {
    key: "link",
    label: "Google Maps",
  },
];

const page = ref(1);
const pageCount = 10;
</script>

<template>
  <UContainer
    class="w-full overflow-scroll rounded-md border-[1px] border-solid border-gray-300 !px-0 dark:border-gray-700"
  >
    <UTable
      :rows="countryRows"
      :columns="contryTableColumns"
      :loading="props.loading"
      ui="max-h-[100px]"
      :loading-state="{
        icon: 'i-heroicons-arrow-path-20-solid',
        label: 'Loading...',
      }"
    >
      <template #name-data="{ row }">
        <span class="flex items-center gap-2">
          <h1>
            {{ row.name }}
          </h1>
          <NuxtImg :src="row.flag" class="h-3" />
        </span>
      </template>

      <template #languages-data="{ row }">
        <div class="flex flex-row gap-1">
          <UBadge
            v-for="lang in row.languages"
            :key="lang"
            role="button"
            variant="subtle"
            class="cursor-pointer hover:opacity-50"
            @click="router.push(`/language/${lang}`)"
          >
            {{ lang }}
          </UBadge>
        </div>
      </template>

      <template #link-data="{ row }">
        <span class="flex w-full justify-center">
          <UTooltip text="Go to Google Maps">
            <UButton
              target="_blank"
              variant="ghost"
              icon="i-heroicons-globe-europe-africa"
              size="xl"
              :to="row.link"
              :ui="{ rounded: 'rounded-full' }"
              :padded="false"
            />
          </UTooltip>
        </span>
      </template>
    </UTable>
  </UContainer>
</template>
