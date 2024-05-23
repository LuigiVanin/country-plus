<script lang="ts" setup>
import type { _maxHeight } from "#tailwind-config/theme";

type CountryTableProps = {
  countries?: Country[] | null;
  targetLang?: string;
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
      capital: country.capital?.[0] || "No capital",
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
    label: "Maps",
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
        <UTooltip :text="`${row.name} - go to GoogleMaps`" class="">
          <a
            class="hover:text-primary flex max-w-60 items-center gap-2 underline-offset-4 hover:underline"
            :href="row.link"
            target="_blank"
          >
            <h1 class="overflow-hidden text-ellipsis">
              {{ row.name }}
            </h1>
            <NuxtImg :src="row.flag" class="mt-1 h-3" />
          </a>
        </UTooltip>
      </template>

      <template #languages-data="{ row }">
        <div class="flex w-40 flex-row flex-wrap gap-1">
          <UBadge
            v-for="lang in row.languages"
            :key="lang"
            :color="lang === props.targetLang ? 'green' : 'primary'"
            role="button"
            variant="subtle"
            class="cursor-pointer hover:opacity-50"
            @click="router.push(`/countries/language/${lang}`)"
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
