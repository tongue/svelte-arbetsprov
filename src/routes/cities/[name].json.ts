import type { RequestHandler } from '@sveltejs/kit';
import type { City } from '$lib/types';
import { objectToQueryParams, toCity, typeCity } from '$lib/utils';

export const get: RequestHandler<Record<string, unknown>, FormData, City[]> = async (request) => {
	const { name } = request.params;

	if (!name.length) return { status: 400 };

	const params = {
		limit: '5',
		minPopulation: '250000',
		namePrefix: name
	};

	const res = await fetch(
		`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?${objectToQueryParams(params)}`,
		{
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
				'x-rapidapi-key': '74b80afbaemsh9f4c334c285f341p11547cjsn0acbeaf35699'
			}
		}
	);

	const { data } = await res.json();
	const body = data.filter(typeCity).map(toCity);

	return {
		status: res.status,
		body
	};
};
