import { countryService } from "~/services/country-service";

export const useFetchCountriesByLang = (lang: string) => {
  const { pending, data, error } = useAsyncData(
    `region/americas/${lang}`,
    () => countryService.fetchCountriesByLang(lang as string),
    {
      immediate: true,
      server: false,
    },
  );

  return {
    pending,
    countries: data,
    error,
  };
};
