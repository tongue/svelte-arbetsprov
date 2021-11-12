import hash from 'object-hash';
import type { GeoCity, City } from '$lib/types';

export const objectToQueryParams = (obj: Record<string, string>): string =>
	Object.entries(obj)
		.map(([key, value]): string => `${key}=${value}`)
		.join('&');

export const generateCityId = (name: string, country: string): string =>
	hash([name.trim().toUpperCase(), country.trim().toUpperCase()]);

export const typeCity = ({ type }: GeoCity): boolean => type === 'CITY';

export const toCity = ({ name, country }: GeoCity): City => ({
	id: generateCityId(name, country),
	name,
	country
});

export const debounce = <Arguments extends unknown[]>(
	func: (...args: Arguments) => unknown,
	timeout: number
): ((...args: Arguments) => void) => {
	let timer: NodeJS.Timeout;
	return (...args: Arguments) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func(...args);
		}, timeout);
	};
};
