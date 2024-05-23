export type Adress = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export type ImportantAdressData = Pick<
  Adress,
  "logradouro" | "uf" | "bairro" | "complemento"
>;
