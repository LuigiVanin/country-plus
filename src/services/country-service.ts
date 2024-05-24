const RESTCOUNTRY_BASE_URL = "https://restcountries.com/v3.1";

const fetchCountriesByLang = async (lang: string) => {
  const countries = await $fetch(
    `${RESTCOUNTRY_BASE_URL}/lang/${lang.toLowerCase()}`,
    {
      method: "GET",
    },
  );
  return countries as Country[];
};

const searchCountriesByName = async (search: string) => {
  search = search.toLowerCase();

  const countries = await $fetch(`${RESTCOUNTRY_BASE_URL}/name/${search}`, {
    method: "GET",
  });

  return countries as Country[];
};

const fetchCountriesByRegion = async (region: string) => {
  const countries = await $fetch(`${RESTCOUNTRY_BASE_URL}/region/${region}`, {
    method: "GET",
  });

  return countries as Country[];
};

export const countryService = {
  fetchCountriesByLang,
  searchCountriesByName,
  fetchCountriesByRegion,
};
