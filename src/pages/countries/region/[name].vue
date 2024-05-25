<script lang="ts" setup>
import PageTitle from "~/components/PageTitle.vue";
import { useFetchCountriesByRegion } from "~/composables/api/useFetchCountriesByRegion";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const { countries, status } = useFetchCountriesByRegion(
  route.params.name as string,
);

const regions = [
  [
    { label: "Africa", click: () => router.push("/countries/region/Africa") },
    {
      label: "Americas",
      click: () => router.push("/countries/region/Americas"),
    },
    { label: "Asia", click: () => router.push("/countries/region/Asia") },
    { label: "Europe", click: () => router.push("/countries/region/Europe") },
    { label: "Oceania", click: () => router.push("/countries/region/Oceania") },
    {
      label: "Antarctic",
      click: () => router.push("/countries/region/Antarctic"),
    },
  ],
];

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

watchEffect(() => {
  if (status.value === "error") {
    toast.add({
      icon: "i-heroicons-archive-box-x-mark",
      title: "Error! Problems trying find countries by region",
      description: "Please, try again later...",
      color: "red",
    });
    router.go(-1);
  }
});
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
        <UDropdown
          :items="regions"
          :ui="{
            background: 'dark:bg-zinc-900',
            item: {
              active:
                'bg-primary-50 text-primary-600 dark:bg-primary-400/10 dark:text-primary-400',
            },
          }"
        >
          <UBadge variant="subtle" size="lg">
            <span class="mr-1">
              {{ route.params.name }}
            </span>
            <UIcon name="i-heroicons-chevron-down" />
          </UBadge>
        </UDropdown>
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
    <div
      v-if="status === 'pending' || status === 'idle'"
      class="mb-12 flex h-64 w-full flex-col items-center justify-center gap-3"
    >
      <UButton
        variant="link"
        :padded="false"
        color="gray"
        loading
        role="none"
      />
      <p class="w-full px-2 text-center text-gray-400 dark:text-gray-500">
        Loading countries from {{ route.params.name }}...
      </p>
    </div>

    <CountryChartBubble
      v-else-if="countries?.length"
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
        {{ route.params.name }}
        <span class="text-gray-400"> ({{ countries?.length || "..." }}) </span>
      </h2>

      <CountryList :countries="countries" :loading="status === 'pending'">
        <template #default="{ country }">
          <CountryCard :data="country" disableActions />
        </template>
      </CountryList>
    </UContainer>
  </div>
</template>
