<script lang="ts">
	import AddCityForm from '$lib/components/AddCityForm.svelte';
	import CityWeatherList from '$lib/components/CityWeatherList.svelte';
	import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
	<title>Weather app</title>
</svelte:head>

<AddCityForm />
<CityWeatherList />
