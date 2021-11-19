import { fetchJson } from '$lib/utils';
import { derived, writable } from 'svelte/store';
import { cities } from './cities';
import type { City, CityAndWeather, Sort, Weather } from '$lib/types';

const defaultValue: [City, Weather][] = [];

export const weather = derived(
	cities,
	($cities, set) => {
		Promise.all(
			$cities.map<Promise<CityAndWeather>>(async (city) => [
				city,
				await fetchJson<Weather>('weather', city.country, city.name)
			])
		).then((data) => set(data));

		return () => {
			set = () => ({});
		};
	},
	defaultValue
);

const sortingFunctions: Record<Sort, (a: CityAndWeather, b: CityAndWeather) => number> = {
	asc: ([, a], [, b]) => +(a.temperature > b.temperature) || -(a.temperature < b.temperature),
	desc: ([, a], [, b]) => +(a.temperature < b.temperature) || -(a.temperature > b.temperature)
};

export const sort = writable<Sort>('asc');

export const sortedWeather = derived(
	[weather, sort],
	([$weather, $sort], set) => {
		set($weather.sort(sortingFunctions[$sort]));
	},
	defaultValue
);
