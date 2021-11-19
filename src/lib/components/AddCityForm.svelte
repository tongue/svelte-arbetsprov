<script lang="ts">
	import type { City } from '$lib/types';
	import { cities } from '$lib/stores/cities';
	import { fetchJson, debounce } from '$lib/utils';

	export let wait = 1000;

	let pending = false;
	let cityName = '';
	let suggestions: City[] = [];
	let error: string | undefined = undefined;

	const cleanUp = () =>
		setTimeout(() => {
			cityName = '';
			suggestions = [];
			error = '';
		}, 0);

	const updateSuggestions = debounce(async (name: string): Promise<void> => {
		suggestions = await fetchJson<City[]>('cities', name);
		pending = false;
	}, wait);

	const addCity = (cityId: string): void => {
		const newCity = suggestions.find((city) => city.id === cityId);
		const cityAlreadyExists = $cities.find((city) => city.id === cityId);
		if (newCity && !cityAlreadyExists) {
			cities.add({ ...newCity });
		} else if (cityAlreadyExists) {
			error = 'The city is already added to the list.';
		} else {
			error = 'Could not find the city among the suggestions.';
		}
	};

	const onInput = (event: Event): void => {
		if (event instanceof InputEvent && event.target instanceof HTMLInputElement) {
			const { value } = event.target;
			if (event.inputType === 'insertReplacementText' && event.data) {
				cleanUp();
				addCity(event.data);
			} else if (value.length > 1) {
				pending = true;
				updateSuggestions(value);
			} else {
				suggestions = [];
			}
		}
	};
</script>

<form action="/api/cities" on:submit|preventDefault>
	{#if error}
		<p>{error}</p>
	{/if}
	<fieldset>
		<legend>Hows the weather in&hellip;</legend>
		<label for="city-input">City</label>
		<input
			list="suggestions"
			id="city-input"
			type="text"
			name="city"
			on:input|preventDefault={onInput}
			bind:value={cityName}
			autocomplete="off"
		/>
		<datalist id="suggestions">
			{#each suggestions as { name, country, id }}
				<option value={id} label={`${name}, ${country}`} />
			{/each}
		</datalist>
		{#if pending}
			<button type="submit" disabled>Searching...</button>
		{:else}
			<button type="submit">Add</button>
		{/if}
	</fieldset>
</form>
