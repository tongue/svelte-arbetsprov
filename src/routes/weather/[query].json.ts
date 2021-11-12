import type { RequestHandler } from '@sveltejs/kit';
import type { City, Weather } from '$lib/types';

const accessKey = '7c09de6432d0d3abe49c5e3be64889bc';

export const get: RequestHandler<
	Record<string, unknown>,
	FormData,
	Weather
> = async (request) => {
	const { query } = request.params;

	if (typeof query === 'string') {
		console.log(query);
		/* const res = await fetch(
		`http://api.weatherstack.com/current?access_key=${accessKey}&query=${query}`,
		{ method: 'GET' }
		);

		const { data } = await res.json(); */
		const body: City[] = [];
		const [name, country] = query.split(',');

		return {
			// status: res.status,
			status: 200,
			body: {
				temperature: Math.random() * (32 - -10) + -10,
				tags: ["cold"]
			}
		};
	} else {
		return {
			status: 400
		};
	}
};
