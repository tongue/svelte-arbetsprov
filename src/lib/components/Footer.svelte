<script lang="ts">
	import { page } from '$app/stores';
</script>

<footer>
	<a sveltekit:prefetch href={$page.path === '/' ? '/about' : '/'}>
		<img src="logo.svg" title="Isotop AB" alt="Isotop logotype" />
	</a>
</footer>

<style>
	footer {
		grid-area: footer;
		display: flex;
		justify-content: center;
	}
</style>
