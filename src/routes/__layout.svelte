<script lang="ts">
	import Header from '$lib/components/Header.svelte';
</script>

<Header />
<main>
	<slot />
</main>

<style>
	:global(body) {
		font-family: sans-serif;
	}
</style>
