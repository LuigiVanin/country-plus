import { countryService } from "~/services/country-service";

export const useFetchCountriesByRegion = (region: string) => {
  const { pending, data, status } = useAsyncData(
    `region/${region}`,
    () => countryService.fetchCountriesByRegion(region),
    {
      immediate: true,
      server: false,
    },
  );

  return { pending, countries: data, status };
};
