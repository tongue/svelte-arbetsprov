import { writable } from 'svelte/store';
import type { City } from '$lib/types';

const createCities = () => {
	const { subscribe, update } = writable<City[]>([]);

	return {
		subscribe,
		add: (city: City) => update((cities) => [...cities, city]),
		remove: (cityId: string) => update((cities) => cities.filter((city) => city.id !== cityId))
	};
};

export const cities = createCities();
