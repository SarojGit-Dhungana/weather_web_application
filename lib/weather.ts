import { weatherAPI } from "@/fake-data/fake_weather_data";

export const weatherFetch = (city: any) => {
  return weatherAPI.find(
    (item) => item.city.toLowerCase() === city.toLowerCase(),
  );
};
