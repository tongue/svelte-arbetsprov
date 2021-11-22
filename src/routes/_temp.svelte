<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:wght@500;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<header role="banner">
	<h1>Hur är vädret i…</h1>
</header>
<form action="/" method="post" aria-owns="weather-list">
	<div id="error" role="alert"><p>Eventuellt felmeddelande</p></div>
	<fieldset>
		<label for="place">Plats</label>
		<input
			type="text"
			size="1"
			placeholder="Nykarleby"
			name="place"
			id="place"
			aria-describedby="error"
		/>
		<button type="submit"><span class="hidden">Sök</span></button>
	</fieldset>
</form>
<main>
	<ul id="weather-list">
		<li>
			<article class:snow={true} class:cold={true}>
				<h2>Namn på stad</h2>
				<table>
					<caption class="hidden">Väderdata</caption>
					<tbody>
						<tr>
							<th scope="row" class="hidden">Temperatur</th>
							<td>23<abbr title="grader Celsius">°</abbr></td>
						</tr>
						<tr class="hidden">
							<th scope="row">Beskrivning</th>
							<td>Varmt</td>
						</tr>
					</tbody>
				</table>
			</article>
			<form action="/" method="post" aria-controls="weather-list">
				<button type="submit"><span class="hidden">Ta bort stad</span></button>
			</form>
		</li>
		<li>
			<article class:sun={true} class:hot={true}>
				<h2>Namn på stad</h2>
				<table>
					<caption class="hidden">Väderdata</caption>
					<tbody>
						<tr>
							<th scope="row" class="hidden">Temperatur</th>
							<td>23<abbr title="grader Celsius">°</abbr></td>
						</tr>
						<tr class="hidden">
							<th scope="row">Beskrivning</th>
							<td>Varmt</td>
						</tr>
					</tbody>
				</table>
			</article>
			<form action="/" method="post" aria-controls="weather-list">
				<button type="submit"><span class="hidden">Ta bort stad</span></button>
			</form>
		</li>
		<li>
			<article class:cloud={true} class:lukewarm={true}>
				<h2>Namn på stad</h2>
				<table>
					<caption class="hidden">Väderdata</caption>
					<tbody>
						<tr>
							<th scope="row" class="hidden">Temperatur</th>
							<td>23<abbr title="grader Celsius">°</abbr></td>
						</tr>
						<tr class="hidden">
							<th scope="row">Beskrivning</th>
							<td>Varmt</td>
						</tr>
					</tbody>
				</table>
			</article>
			<form action="/" method="post" aria-controls="weather-list">
				<button type="submit"><span class="hidden">Ta bort stad</span></button>
			</form>
		</li>
	</ul>
</main>
<footer>
	<img src="logo.svg" title="Isotop" alt="logo" />
</footer>

<style>
	:global(:root) {
		--color-base-pale: #eeeeee;
		--color-base-black: #000000;
		--color-base-white: #ffffff;
		--color-brand-yellow: #fac710;
		--color-brand-red: #f24726;
		--color-brand-blue: #2d9bf0;
		--color-brand-blue-sky: #75d5ee;
		--color-brand-green: #8fd14f;
		--border-radius-round: 1000px;
		--border-radius-m: 5px;
		--border-radius-s: 2px;
		--size-3xl: 4rem;
		--size-2xl: 3rem;
		--size-xl: 2rem;
		--size-l: 1.25rem;
		--size-m: 1rem;
		--size-s: 0.75rem;
		--weight-regular: 500;
		--weight-bold: 800;
		--spacing-xl: 3rem;
		--spacing-l: 2rem;
		--spacing-m: 1.5rem;
		--spacing-s: 1rem;
		--spacing-xs: 0.5rem;
		--color-foreground: var(--color-base-black);
		--color-background: var(--color-base-pale);
		--color-negative: var(--color-base-white);
		--color-highlight: var(--color-brand-blue-sky);
		--color-alert: var(--color-brand-red);
		--color-cold: var(--color-brand-blue);
		--color-lukewarm: var(--color-brand-yellow);
		--color-hot: var(--color-brand-red);
		--size-heading: var(--size-xl);
		--size-input: var(--size-l);
		--size-body: var(--size-m);
		--size-display: var(--size-2xl);
		--spacing-gap: var(--spacing-m);
	}
	@media screen and (min-width: 48em) {
		:global(:root) {
			--size-body: var(--size-l);
			--size-display: var(--size-3xl);
			--spacing-gap: var(--spacing-l);
		}
	}
	:global(*) {
		box-sizing: border-box;
	}
	:global(*:before),
	:global(*:after) {
		box-sizing: inherit;
	}
	:global(body),
	:global(form),
	:global(ul),
	:global(li),
	:global(p),
	:global(h1),
	:global(table),
	:global(tbody),
	:global(caption),
	:global(tr),
	:global(th),
	:global(td),
	:global(input),
	:global(button),
	:global(label),
	:global(fieldset),
	:global(header),
	:global(main),
	:global(footer),
	:global(article),
	:global(h2),
	:global(abbr) {
		all: unset;
	}
	:global(body) {
		display: grid;
		min-height: 100vh;
		grid-template-columns: minmax(var(--spacing-gap), 100%) minmax(20em, 64em) minmax(
				var(--spacing-gap),
				100%
			);
		grid-template-rows: repeat(3, auto);
		grid-template-areas:
			'. . .'
			'. app .'
			'. . .';
		align-items: center;
		font-family: Roboto;
		font-weight: 500;
		background-color: var(--color-background);
	}
	:global(#svelte) {
		grid-area: app;
		display: grid;
		min-height: 100vh;
		grid-template-rows: auto min-content min-content auto minmax(var(--spacing-l), auto) min-content;
		grid-template-areas: '.' 'header' 'form' 'main' '.' 'footer';
	}
	.hidden {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}
	header {
		grid-area: header;
	}
	h1 {
		display: block;
		text-align: center;
		font-size: var(--size-heading);
		font-weight: var(--weight-bold);
	}
	div[role='alert'],
	div[role='alert']::before {
		background-color: var(--color-alert);
	}
	form {
		grid-area: form;
		position: relative;
	}
	div[role='alert'] {
		position: absolute;
		top: calc(var(--spacing-xs) * -1);
		left: 0;
		right: 0;
		transform: translateY(-100%);
		margin-bottom: var(--spacing-xs);
		padding: var(--spacing-xs) var(--spacing-s);
		color: var(--color-negative);
		border-radius: var(--border-radius-m);
		box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075),
			0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075),
			0 16px 16px hsl(0deg 0% 0% / 0.075);
	}
	div[role='alert']::before {
		position: absolute;
		bottom: 0;
		right: var(--spacing-xs);
		transform: rotate(45deg) translate(-50%, 125%);
		content: '';
		height: var(--spacing-xs);
		width: var(--spacing-xs);
		border-left-color: transparent;
		border-top-color: transparent;
	}
	fieldset {
		display: grid;
		grid-template-columns: min-content minmax(min-content, auto) min-content;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-s);
		background-color: var(--color-negative);
		border: 0;
		border-radius: var(--border-radius-m);
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
		all: unset;
		background-image: url(plus.svg);
		width: 1.5em;
		height: 1.5em;
	}
	input {
		color: var(--color-foreground);
	}
	main {
		grid-area: main;
	}
	ul {
		margin-top: var(--spacing-l);
		display: grid;
		gap: var(--spacing-gap);
	}
	li {
		display: block;
		position: relative;
	}
	li > form {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		top: var(--spacing-xs);
		right: var(--spacing-xs);
		background-color: var(--color-negative);
		height: var(--spacing-m);
		width: var(--spacing-m);
		border-radius: var(--border-radius-round);
	}
	li > form > button {
		background-image: url(plus.svg);
		background-size: 60%;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		height: var(--spacing-m);
		width: var(--spacing-m);
		transform: rotate(45deg);
		cursor: pointer;
	}
	article {
		display: grid;
		grid-template-rows: auto min-content min-content auto;
		grid-template-areas: '.' 'data' 'name' '.';
		padding: var(--spacing-s);
		padding-left: calc(100% / 3);
		background-color: var(--card-color, var(--color-foreground));
		border-radius: var(--border-radius-s);
		background-repeat: no-repeat;
		background-position: var(--spacing-l) 50%;
		min-height: 7rem;
		color: var(--color-negative);
	}
	.cold {
		--card-color: var(--color-cold);
	}
	.lukewarm {
		--card-color: var(--color-lukewarm);
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
	h2 {
		grid-area: name;
		display: block;
		font-size: var(--size-body);
		text-transform: uppercase;
		font-weight: var(--weight-bold);
	}
	table {
		grid-area: data;
		font-size: var(--size-display);
	}
	footer {
		grid-area: footer;
		display: flex;
		justify-content: center;
	}
</style>
