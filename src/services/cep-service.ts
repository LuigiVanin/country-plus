import { z } from "zod";
import type { Adress } from "~/types/cep";

const CEPAPI_BASE_URL = "https://viacep.com.br/ws";

const cepValidator = z
  .string()
  .min(0, "CEP is required")
  .regex(/^\d{5}-\d{3}$/, {
    message: "CEP must be in the format XXXXX-XXX",
  });

export const fetchAddressFromCep = async (cep: string) => {
  // validate cpf usinf cpfValidator
  cepValidator.parse(cep);
  cep = cep.replace("-", "");

  console.log("Fetching");
  const adress = await $fetch(`${CEPAPI_BASE_URL}/${cep}/json`, {
    method: "GET",
  });
  return adress as Adress;
};

export const cepService = {
  fetchAddressFromCep,
};
