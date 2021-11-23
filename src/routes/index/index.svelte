<script lang="ts">
	import AddCityForm from './_AddCityForm.svelte';
	import { cities } from '$lib/cities';
	import { sortedWeather, sort } from '$lib/weather';
	import type { Sort } from '$lib/types';
	import WeatherCard from '$lib/WeatherCard.svelte';
	import SortBy from '$lib/SortBy.svelte';

	const remove: (id: string) => () => void = (id) => () => cities.remove(id);

	const sortingMethods: Record<string, Sort> = {
		asc: 'Stigande',
		desc: 'Fallande'
	};

	const changeSortingMethod: (method: Sort) => () => void = (method) => () => sort.set(method);

	$: pendingWeatherAmount = $cities.length - $sortedWeather.length;
</script>

<svelte:head>
	<title>Weather app</title>
</svelte:head>

<AddCityForm />
<main>
	<SortBy disabled={!$sortedWeather.length} methods={sortingMethods} label="temperature" onChange={changeSortingMethod} />
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
</style>
