<script lang="ts" setup>
import { countryService } from "~/services/country-service";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const { pending, data, error } = useAsyncData(
  `region/americas/${route.params.lang}`, // NOTE: Temporarily disabling caching -
  () => countryService.fetchCountriesByLang(route.params.lang as string),
  {
    immediate: true,
    server: false,
  },
);

watchEffect(() => {
  if (error.value) {
    toast.add({
      title: "Error! Could not find coutries by language",
      color: "red",
    });
    router.push("/");
  }
});
</script>

<template>
  <PageTitle back-button>
    <div class="flex items-center gap-2">
      <NuxtLink
        to="/"
        class="hover:text-primary hover:underline hover:underline-offset-4"
      >
        <h1 class="font-semibold sm:text-lg">Countries</h1>
      </NuxtLink>
      <UIcon name="i-heroicons-chevron-right" />
      <h1 class="font-semibold sm:text-lg">Language</h1>
      <UIcon name="i-heroicons-chevron-right" />
      <UBadge variant="subtle" size="lg">{{ route.params.lang }}</UBadge>
    </div>
  </PageTitle>
  <CountryTable
    :countries="data"
    :loading="pending"
    :target-lang="route.params.lang as string"
  />
</template>
