import type { Sort, City } from '$lib/types';

export const objectToQueryParams = (obj: Record<string, string>): string =>
	Object.entries(obj)
		.map(([key, value]): string => `${key}=${value}`)
		.join('&');

export const generateCityId = (name: string, country: string): string =>
	`${name.trim().toUpperCase()}_${country.trim().toUpperCase()}`;

export const cityAndCountryFromString = (str: string): [string, string] | undefined => {
	const cityAndCountry = str.split(",");
	return (cityAndCountry.length === 2) ? [cityAndCountry[0].trim(), cityAndCountry[1].trim()] : undefined;
}

export const getCity = (name: string, country: string): (city: City) => boolean => (city) => city.name === name && city.country === country;

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

export const fetchJson = async <Result extends Record<string, unknown> | unknown[]>(
	...path: string[]
): Promise<Result> => {
	const res = await fetch(encodeURI(`/${path.join('/')}.json`));
	return await res.json();
};
