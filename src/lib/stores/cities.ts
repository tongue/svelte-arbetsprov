import { writable } from 'svelte/store';
import type { City, Weather } from '$lib/types';

type CityWeather = {
	weather: Weather
} & City;

function createCities() {
	const { subscribe, update } = writable<CityWeather[]>([]);

	return {
		subscribe,
		add: (city: CityWeather) => update((cities) => [...cities, city]),
		remove: (cityId: string) =>
			update((cities) => cities.filter((city) => city.id !== cityId))
	};
}

export const cities = createCities();
