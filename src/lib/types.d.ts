export type GeoCity = {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  latitude: number;
  longitude: number;
  population: number;
};

export type City = {
  id: string;
  name: string;
  country: string;
}

export type WeatherTag = "sun" | "cloud" | "rain" | "snow";

export type Weather = {
  temperature: number;
  tags: WeatherTag[];
}
