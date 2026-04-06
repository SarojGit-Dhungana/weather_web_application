import { servicesAPI } from "@/fake-data/fake_service_data";

export const serviceFetch = (city: string) => {
  return servicesAPI.filter((service) => service.cities.includes(city));
};
