<script lang="ts">
	import { cities } from '$lib/stores/cities';
	import { sortedWeather, sort } from '$lib/stores/weather';
	import { isSort } from '$lib/utils';

	const remove =
		(id: string): (() => void) =>
		() =>
			cities.remove(id);

	const onSortChange = (event: Event) => {
		if (event.target instanceof HTMLInputElement) {
			const { value } = event.target;
			if (isSort(value)) {
				sort.set(value);
			}
		}
	};

	$: pendingWeatherAmount = $cities.length - $sortedWeather.length;
</script>

<form>
	<fieldset disabled={!$sortedWeather.length}>
		<legend>Sort by temperature</legend>
		<input on:change={onSortChange} type="radio" value="asc" id="asc" name="sort" checked />
		<label for="asc">Ascending</label>
		<input on:change={onSortChange} type="radio" value="desc" id="desc" name="sort" />
		<label for="desc">Descending</label>
	</fieldset>
</form>
{#if $sortedWeather.length}
	<ol>
		{#each $sortedWeather as [city, weather]}
			<li>
				<form on:submit|preventDefault={remove(city.id)}>
					<button type="submit">Remove</button>
				</form>
				<article>
					<h2>{city.name}, {city.country}</h2>
					<table>
						<thead>
							<tr>
								<th>Temperature</th>
								<th>Tags</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{weather.temperature}</td>
								<td>{weather.tags}</td>
							</tr>
						</tbody>
					</table>
				</article>
			</li>
		{/each}
		{#if pendingWeatherAmount > 0}
			{#each Array(pendingWeatherAmount).fill(0) as i}
				<li>
					<article>
						Loading.. {i}
					</article>
				</li>
			{/each}
		{/if}
	</ol>
{/if}
