<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { db } from '../firebase';
	import { onMount } from 'svelte';
	onMount(() => {
		db.ref()
			.limitToFirst(10)
			.on('value', (snapshot) => {
				console.log(snapshot.val());
			});
	});
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
