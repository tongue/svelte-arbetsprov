<script lang="ts">
	export let name: string;
	export let country: string;
	export let temperature: number;
	export let tags: string[];
</script>

<article
	class:cold={temperature <= 0}
	class:neutral={temperature > 0 && temperature < 20}
	class:hot={temperature >= 20}
>
	<h2 title={`${name}, ${country}`}>{name}, {country}</h2>
	<table>
		<caption class="hidden">Väderdata</caption>
		<tbody>
			<tr>
				<th scope="row" class="hidden">Temperatur</th>
				<td>{temperature}<abbr title="grader Celsius">°</abbr></td>
			</tr>
			<tr class="hidden">
				<th scope="row">Beskrivning</th>
				<td>
					{#each tags as tag}
						<span>{tag}</span>
					{/each}
				</td>
			</tr>
		</tbody>
	</table>
</article>

<style>
	article {
		display: grid;
		grid-template-rows: auto min-content min-content auto;
		grid-template-areas: '.' 'data' 'name' '.';

		padding: var(--spacing-s) var(--spacing-s) var(--spacing-s) calc(100% / 3);

		color: var(--color-negative);
		background-color: var(--card-color, var(--color-foreground));
		background-repeat: no-repeat;
		background-position: var(--spacing-l) 50%;

		border-radius: var(--border-radius-s);

		aspect-ratio: 67/24;
	}

	@media (min-width: 48em) {
		article {
			aspect-ratio: 19/9;
		}
	}

	h2 {
		grid-area: name;
		font-size: var(--size-body);
		text-transform: uppercase;
		font-weight: var(--weight-bold);
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	table {
		grid-area: data;
		font-size: var(--size-display);
	}

	.cold {
		--card-color: var(--color-cold);
	}

	.neutral {
		--card-color: var(--color-neutral);
	}

	.hot {
		--card-color: var(--color-hot);
	}

	.snow {
		background-image: url(snow.svg);
	}

	.sun {
		background-image: url(sun.svg);
	}

	.cloud {
		background-image: url(cloud.svg);
	}
</style>
