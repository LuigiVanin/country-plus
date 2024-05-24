import { countryService } from "~/services/country-service";

export const useFetchCountriesFromAmerica = () => {
  const { pending, data } = useAsyncData(
    "region/americas",
    () => countryService.fetchCountriesByRegion("Americas"),
    {
      immediate: true,
      server: false,
    },
  );

  return { pending, countries: data };
};
