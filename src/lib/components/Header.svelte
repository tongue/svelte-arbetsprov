<script lang="ts">
	import { page } from '$app/stores';
</script>

<header>
	<a sveltekit:prefetch href={$page.path === '/' ? '/about' : '/'}> Isotop </a>
</header>
