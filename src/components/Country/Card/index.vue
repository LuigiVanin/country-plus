<script setup lang="ts">
import { twMerge } from "tailwind-merge";

type CountryItemProps = {
  data: Country;
  class?: string;
  disableActions?: boolean;
};

const items = [
  {
    label: "More Information",
    icon: "i-heroicons-information-circle",
    slot: "more-info",
  },
];

const props = defineProps<CountryItemProps>();
</script>

<template>
  <UCard
    :class="twMerge(props.class || '', 'relative bg-white dark:bg-zinc-900')"
    :ui="{
      shadow: 'shadow-md',
      ring: 'dark:ring-gray-600',
      divide: ' dark:divide-gray-600',
    }"
  >
    <template #header>
      <div>
        <div class="flex gap-2">
          <h2
            class="max-w-full overflow-hidden text-ellipsis text-lg font-semibold"
          >
            <span class="max-w-full overflow-hidden text-ellipsis text-nowrap">
              {{ props.data.name.common }}
            </span>

            <span class="!text-md hidden font-thin text-gray-400 sm:inline">
              ~
              <UTooltip text="country capital" :popper="{ placement: 'top' }">
                {{ props.data.capital?.[0] || "" }}
              </UTooltip>
            </span>
          </h2>
          <NuxtImg :src="props.data.flags.svg" class="mt-1 h-4 rounded-sm" />
        </div>
        <p class="-translate-y-1 text-xs text-gray-400">
          {{ props.data.name.official }}
        </p>
      </div>
      <div
        class="mt-2 flex w-full flex-col justify-start gap-2 sm:flex-row sm:items-center sm:gap-1"
      >
        <div class="flex items-center gap-1">
          <span class="text-xs text-gray-400">Region</span>
          <UBadge variant="subtle">{{ props.data.region }}</UBadge>
        </div>

        <UIcon name="i-heroicons-chevron-right" class="hidden h-3 sm:flex" />

        <div class="flex items-center gap-1">
          <span class="text-xs text-gray-400">Subregion</span>
          <UBadge variant="subtle" color="orange">{{
            props.data.subregion
          }}</UBadge>
        </div>
      </div>
    </template>

    <UTooltip
      :text="props.data.independent ? 'Independent country' : 'Not independent'"
      class="absolute right-3 top-3"
    >
      <UIcon v-if="props.data.independent" name="i-heroicons-flag" />
      <UIcon v-else name="i-heroicons-globe-asia-australia" class="h-5 w-5" />
    </UTooltip>

    <UAccordion :items="items">
      <template #more-info>
        <UContainer
          class="bg-primary-50 dark:bg-primary-950 flex flex-col gap-2 rounded-md !p-3"
        >
          <div class="flex w-full flex-row flex-wrap items-center gap-1">
            <span class="text-gray-500 dark:text-gray-400">Languages: </span>
            <NuxtLink
              v-for="lang in props.data.languages"
              :key="lang"
              :to="`/countries/language/${lang}`"
            >
              <UBadge
                role="button"
                variant="subtle"
                color="orange"
                class="cursor-pointer hover:opacity-50"
              >
                {{ lang }}
              </UBadge>
            </NuxtLink>
          </div>

          <div
            class="fap-4 flex w-full flex-col justify-start gap-2 text-gray-500 sm:flex-row sm:items-center dark:text-gray-400"
          >
            <div class="flex flex-row flex-wrap items-center gap-1">
              <UIcon name="i-heroicons-map" class="h-4 w-4" />
              <p>
                <span>Area: </span>
                <strong>{{ props.data.area.toLocaleString() }}km² </strong>
              </p>
            </div>

            <span class="hidden h-1 w-1 rounded-full bg-gray-400 sm:flex" />

            <div class="flex flex-row items-center gap-1">
              <UIcon name="i-heroicons-user-group" class="h-4 w-4" />
              <p class="w-full overflow-hidden text-ellipsis text-nowrap">
                <span> Population: </span>
                <strong
                  >{{ props.data.population.toLocaleString() }} people
                </strong>
              </p>
            </div>

            <span class="hidden h-1 w-1 rounded-full bg-gray-400 sm:flex" />

            <div class="flex flex-row items-center gap-1">
              <UIcon name="i-heroicons-user-group" class="h-4 w-4" />
              <p class="w-full overflow-hidden text-ellipsis text-nowrap">
                <span> Ratio: </span>
                <strong
                  >{{ (props.data.population / props.data.area).toFixed(1) }}
                  people/km²
                </strong>
              </p>
            </div>
          </div>
        </UContainer>
      </template>
    </UAccordion>

    <div
      v-if="!props.disableActions"
      class="mt-4 flex w-full flex-row justify-end gap-2"
    >
      <UButton
        icon="i-heroicons-map-pin"
        :to="props.data.maps.googleMaps"
        target="_blank"
        variant="soft"
      >
        Google Maps
      </UButton>
      <UTooltip text="Population and area chart page">
        <UButton
          icon="i-heroicons-user-group"
          :to="`/countries/region/${props.data.region}`"
        >
          Region
        </UButton>
      </UTooltip>
    </div>
  </UCard>
</template>
