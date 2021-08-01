<script context="module" lang="ts">
	export const prerender = true;
	fetch('/api')
		.then((d) => d.json())
		.then((res) => console.log(res))
		.catch((error) => console.error('error'));
</script>

<script lang="ts">
	import Counter from '$lib/Counter.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>Hadith Toolkit UI</h1>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}
</style>
