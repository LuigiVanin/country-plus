type Country = {
  name: {
    official: string;
    common: string;
  };
  capital?: string[];
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  languages: {
    [abbreviation: string]: string;
  };
  flags: {
    svg: string;
    png: string;
    alt: string;
  };
  flag: string;
  subregion: string;
  region: string;
  independent: boolean;
  area: number;
  population: number;
};
