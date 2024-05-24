<script lang="ts" setup>
import PageTitle from "~/components/PageTitle.vue";
import { useFetchCountriesByRegion } from "~/composables/api/useFetchCountriesByRegion";

const router = useRouter();
const route = useRoute();
const { countries, status } = useFetchCountriesByRegion(
  route.params.name as string,
);

const countryListContainerRef = ref<any | null>(null);

const onCountryClick = (countryName: string) => {
  countryListContainerRef.value?.$el
    .querySelector(
      `[data-country-name="${countryName.toLowerCase().replace(" ", "-")}"]`,
    )
    ?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
};
</script>

<template>
  <div>
    <PageTitle
      :description="`comprehensive resource on population and area data for countries in the ${route.params.name}. This page provides detailed insights into the demographic and geographic characteristics of the nations within this region.`"
      back-button
    >
      <div class="flex items-center gap-2">
        <NuxtLink
          to="/"
          class="hover:text-primary hover:underline hover:underline-offset-4"
        >
          <h1 class="font-semibold sm:text-lg">Countries</h1>
        </NuxtLink>
        <UIcon name="i-heroicons-chevron-right" />
        <h1 class="font-semibold sm:text-lg">Region</h1>
        <UIcon name="i-heroicons-chevron-right" />
        <UBadge variant="subtle" size="lg">{{ route.params.name }}</UBadge>
      </div>
    </PageTitle>

    <div class="mb-4 flex items-center justify-center gap-2">
      <h1 class="font-bold">Population x Area chart</h1>
      <UPopover mode="hover" class="flex items-center">
        <UIcon name="i-heroicons-information-circle" class="h-5 w-5" />
        <template #panel>
          <p class="w-72 p-2 text-xs text-gray-400">
            On the chart, each bubble represents a country. Click on a bubble to
            access information about the corresponding country in the same page.
          </p>
        </template>
      </UPopover>
    </div>

    <CountryChartBubble
      v-if="countries?.length"
      :countries="countries"
      @country-click="onCountryClick"
    />

    <UDivider class="my-6" />

    <UContainer ref="countryListContainerRef" class="!mx-0 px-0">
      <h2 class="flex items-center gap-2 sm:-translate-x-8 sm:text-lg">
        <UIcon
          name="i-heroicons-bars-3-center-left-16-solid"
          class="hidden h-6 w-6 sm:flex"
        />
        Countries from
        <UBadge variant="subtle" size="lg">{{ route.params.name }}</UBadge>
        ({{ countries?.length || "..." }})
      </h2>

      <CountryList :countries="countries" :loading="status === 'pending'">
        <template #default="{ country }">
          <CountryCard :data="country" disableActions />
        </template>
      </CountryList>
    </UContainer>
  </div>
</template>
