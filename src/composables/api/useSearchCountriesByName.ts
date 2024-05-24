import { countryService } from "~/services/country-service";

export const useSearchCountryByName = (searchRef: Ref<string>) => {
  // const search = ref("");

  const { data, execute, clear, status, error, pending } = useAsyncData(
    () => countryService.searchCountriesByName(searchRef.value),
    {
      immediate: false,
    },
  );

  return { pending, countries: data, search: execute, clear, status, error };
};
