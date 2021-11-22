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
			error = undefined;
		} else if (cityAlreadyExists) {
			error = `"${cityAlreadyExists.name}" is already added to the list.`;
		} else {
			error = 'Not a valid city.';
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

<form action="/cities" method="post" on:submit|preventDefault aria-owns="weather-list">
	{#if error}
		<div id="city-error" role="alert">
			<p>{error}</p>
		</div>
	{/if}
	<fieldset>
		<label for="place">Plats</label>
		<input
			list="suggestions"
			id="place"
			type="text"
			name="city"
			placeholder="Stockholm, Sweden"
			autocomplete="off"
			on:input|preventDefault={onInput}
			bind:value={cityName}
		/>
		<datalist id="suggestions">
			{#each suggestions as { name, country, id }}
				<option value={id} label={`${name}, ${country}`} />
			{/each}
		</datalist>
		<button type="submit" class:pending={pending} disabled={pending}>
			<span class="hidden">
				{#if pending}
					Searching...
				{:else}
					Add
				{/if}
			</span>
		</button>
	</fieldset>
</form>

<style>
	form {
		grid-area: form;
		display: flex;
		justify-content: center;
	}

	fieldset {
		display: grid;
		grid-template-columns: min-content minmax(7rem, auto) min-content;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-s);
		background-color: var(--color-negative);
		border: 0;
		border-radius: var(--border-radius-m);
		width: 100%;
		max-width: 38rem;
	}

	label,
	input {
		font-size: var(--size-l);
	}

	label {
		font-weight: var(--weight-bold);
	}

	label::after {
		content: ':';
	}

	fieldset button {
		background-image: url(plus.svg);
		width: 1.5em;
		height: 1.5em;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.pending {
		animation: rotate 750ms linear infinite;
	}

	input {
		color: var(--color-foreground);
	}

	div[role='alert'] {
		margin-bottom: var(--spacing-xs);
		padding: var(--spacing-xs) var(--spacing-s);

		color: var(--color-negative);
		background-color: var(--color-alert);

		border-radius: var(--border-radius-m);
	}
</style>
