<script lang="ts" setup>
type CountryTableProps = {
  countries?: Country[] | null;
  targetLang?: string;
  disableRegionColumn?: boolean;
  loading: boolean;
};

const props = defineProps<CountryTableProps>();

const router = useRouter();

const countryRows = computed(() => {
  if (!props.countries) return [];

  return props.countries.map((country) => {
    return {
      name: country.name.official || country.name.official,
      flag: country.flags.svg,
      capital: country.capital?.[0] || "No capital",
      languages: Object.values(country.languages),
      subregion: country.subregion,
      region: country.region,
      link: country.maps.googleMaps,
    };
  });
});

const contryTableColumns = ref([
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
]);

onMounted(() => {
  if (!props.disableRegionColumn) {
    contryTableColumns.value.splice(2, 0, {
      key: "region",
      label: "Region",
      sortable: true,
      direction: "desc" as const,
    });
  }
});
</script>

<template>
  <UContainer
    class="w-full rounded-md border-[1px] border-solid border-gray-300 !px-0 dark:border-gray-700"
  >
    <UTable
      :rows="countryRows"
      :columns="contryTableColumns"
      :loading="props.loading"
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
            <span class="overflow-hidden text-ellipsis">
              {{ row.name }}
            </span>
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

      <template #subregion-data="{ row }">
        <!-- <p class="max-w-12"> -->
        <UTooltip :text="row.subregion">
          <span class="block max-w-32 overflow-hidden text-ellipsis">
            {{ row.subregion }}
          </span>
        </UTooltip>
        <!-- </p> -->
      </template>

      <template #region-data="{ row }">
        <UBadge
          role="button"
          variant="subtle"
          class="cursor-pointer hover:opacity-50"
          @click="router.push(`/countries/region/${row.region}`)"
        >
          {{ row.region }}
        </UBadge>
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
