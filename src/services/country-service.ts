const RESTCOUNTRY_BASE_URL = "https://restcountries.com/v3.1";

export const fetchContriesFromAmericas = async () => {
  console.log("Fetching");
  const countries = await $fetch(`${RESTCOUNTRY_BASE_URL}/region/americas`, {
    method: "GET",
  });
  return countries as Country[];
};

export const fetchCountriesByLang = async (lang: string) => {
  const countries = await $fetch(
    `${RESTCOUNTRY_BASE_URL}/lang/${lang.toLowerCase()}`,
    {
      method: "GET",
    },
  );
  return countries as Country[];
};

export const countryService = {
  fetchContriesFromAmericas,
  fetchCountriesByLang,
};
