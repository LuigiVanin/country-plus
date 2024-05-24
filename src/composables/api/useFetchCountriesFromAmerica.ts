import { countryService } from "~/services/country-service";

export const useFetchCountriesFromAmerica = () => {
  const { pending, data } = useAsyncData(
    "region/americas", // NOTE: Temporarily disabling caching -
    () => countryService.fetchCountriesByRegion("Americas"),
    {
      immediate: true,
      server: false,
    },
  );

  return { pending, countries: data };
};
