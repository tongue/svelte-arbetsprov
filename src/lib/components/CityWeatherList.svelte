<script lang="ts">
	import { cities } from '$lib/stores/cities';
	import { sortedWeather, sort } from '$lib/stores/weather';
	import type { Sort } from '$lib/types';
	import WeatherCard from './WeatherCard.svelte';

	const remove: (id: string) => () => void = (id) => () => cities.remove(id);

	const sortingMethods: Record<string, Sort> = {
		Stigande: 'asc',
		Fallande: 'desc'
	};

	const changeSortingMethod: (method: Sort) => () => void = (method) => () => sort.set(method);

	$: pendingWeatherAmount = $cities.length - $sortedWeather.length;
</script>

<main>
	<form>
		<fieldset disabled={!$sortedWeather.length}>
			<label for="sort">Sortera på temperatur</label>
			{#each Object.entries(sortingMethods) as [label, method], index}
				<input
					type="radio"
					name="sort"
					value={method}
					id={method}
					checked={index === 0}
					on:change={changeSortingMethod(method)}
				/>
				<label for={method}>{label}</label>
			{/each}
		</fieldset>
	</form>
	{#if $sortedWeather.length}
		<ol id="weather-list">
			{#each $sortedWeather as [city, weather]}
				<li>
					<WeatherCard {...city} {...weather} />
					<form on:submit|preventDefault={remove(city.id)} aria-controls="weather-list">
						<button type="submit"><span class="hidden">Ta bort</span></button>
					</form>
				</li>
			{/each}
			{#if pendingWeatherAmount > 0}
				{#each Array(pendingWeatherAmount).fill(0) as _}
					<li>
						<article>Loading...</article>
					</li>
				{/each}
			{/if}
		</ol>
	{/if}
</main>

<style>
	main {
		grid-area: main;
	}

	ol {
		margin-top: var(--spacing-l);
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
		gap: var(--spacing-gap);
	}

	li {
		display: block;
		position: relative;
	}

	li > form {
		position: absolute;
		top: var(--spacing-xs);
		right: var(--spacing-xs);
		width: var(--spacing-m);

		display: flex;
		align-items: center;
		justify-content: center;

		background-color: var(--color-negative);
		border-radius: var(--border-radius-round);
	}

	button {
		background: no-repeat center/60% url(plus.svg);
		width: var(--spacing-m);
		aspect-ratio: 1 / 1;
		transform: rotate(45deg);
	}

	fieldset {
		display: flex;
		align-items: center;
		justify-content: end;
	}

	label[for="sort"]::after {
		content: ":";
		margin-right: var(--spacing-xs);
	}

	label {
		cursor: pointer;
	}

	input[type="radio"] + label {
		display: inline-flex;
		align-items: center;
		padding: 0 var(--spacing-xs);
		height: var(--spacing-l);
		border-radius: var(--border-radius-s);

		background-color: var(--color-negative);
	}

	input[type="radio"]:checked + label {
		background-color: var(--color-foreground);
		color: var(--color-negative);
	}
</style>
