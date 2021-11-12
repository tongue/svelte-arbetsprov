<script lang="ts">
	import AddCityForm from '$lib/components/AddCityForm.svelte';
	import { cities } from '$lib/stores/cities';

	const remove =
		(id: string): (() => void) =>
		() =>
			cities.remove(id);

	$: cityWeathers = $cities
		.map((city) => ({
			...city,
			weather: fetch(encodeURI(`/weather/${city.name},${city.country}.json`)).then((res) =>
				res.json()
			)
		}))
		.sort((a, b) => console.log('sort', a, b) || -1);
</script>

<svelte:head>
	<title>Weather app</title>
</svelte:head>

<AddCityForm />

{#if cityWeathers.length}
	<ul>
		{#each cityWeathers as city}
			<li>
				<form on:submit|preventDefault={remove(city.id)}>
					<button type="submit">Remove</button>
				</form>
				<article>
					<h2>{city.name}, {city.country}</h2>
					{#await city.weather}
						<p>loading...</p>
					{:then cityWeather}
						<h3>{cityWeather.temperature}</h3>
					{:catch error}
						<p>Error: {error.message}</p>
					{/await}
				</article>
			</li>
		{/each}
	</ul>
{/if}
