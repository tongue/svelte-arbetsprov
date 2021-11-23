import { writable } from 'svelte/store';
import type { City } from '$lib/types';
import { browser } from "$app/env";

const createCities = () => {
	const c = browser ? JSON.parse(localStorage.getItem('cities') || "[]") : [];
	const { subscribe, update } = writable<City[]>(c);

	return {
		subscribe,
		add: (city: City) => update((cities) => [...cities, city]),
		remove: (cityId: string) => update((cities) => cities.filter((city) => city.id !== cityId))
	};
};

export const cities = createCities();

cities.subscribe((value) => {
	if (browser) localStorage.cities = JSON.stringify(value);
});
