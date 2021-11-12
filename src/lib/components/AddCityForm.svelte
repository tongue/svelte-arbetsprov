<script lang="ts">
	import type { City } from '$lib/types';
	import { cities } from '$lib/stores/cities';
	import { debounce } from '$lib/utils';

	export let debounceTime = 1000;

	let name = '';
	let suggestions: City[] = [];
	let error: string | undefined = undefined;

	const clearNameInput = () =>
		setTimeout(() => {
			name = '';
		}, 0);

	const cleanUp = () => {
		clearNameInput();
		suggestions = [];
	};

	const getWeather = async (city: City) => {
		const res = await fetch(encodeURI(`/weather/${city.name},${city.country}.json`));
		return await res.json();
	}

	const getSuggestions = debounce(async (query: string): Promise<void> => {
		if (query.length > 1) {
			const res = await fetch(`/cities/${query}.json`);
			suggestions = await res.json();
		}
	}, debounceTime);

	const addCity = async (cityId: string | null): Promise<void> => {
		error = undefined;

		if (cityId) {
			const newCity = suggestions.find((city) => city.id === cityId);
			const cityAlreadyExists = $cities.find((city) => city.id === cityId);

			if (newCity && !cityAlreadyExists) {
				cleanUp();
				const weather = getWeather(newCity);
				cities.add({ ...newCity, weather });
			} else if (cityAlreadyExists) {
				cleanUp();
				error = 'The city is already added to the list.';
			} else {
				error = 'Could not find the city among the suggestions.';
			}
		} else {
			error = 'No city id provided.';
		}
	};

	const onInput = (event: Event): void => {
		if (event instanceof InputEvent && event.target instanceof HTMLInputElement) {
			if (event.inputType === 'insertReplacementText') {
				addCity(event.data);
			} else {
				getSuggestions(event.target.value);
			}
		}
	};
</script>

<form action="/api/cities" on:submit|preventDefault>
	{#if error}
		<p>{error}</p>
	{/if}
	<label for="city-input">Find a city</label>
	<input
		list="suggestions"
		id="city-input"
		type="text"
		name="city"
		on:input={onInput}
		bind:value={name}
		autocomplete="off"
	/>
	<datalist id="suggestions">
		{#each suggestions as { name, country, id }}
			<option value={id}>{name}, {country}</option>
		{/each}
	</datalist>
	<button type="submit">Add</button>
</form>
