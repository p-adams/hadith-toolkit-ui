<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { db } from '../firebase';
	import { onMount } from 'svelte';
	let biographies = [];
	onMount(() => {
		db.ref()
			.limitToFirst(10)
			.on('value', (snapshot) => {
				// console.log(snapshot.val());
				biographies = [...snapshot.val()];
				console.log('bio', biographies);
			});
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>Hadith Toolkit UI</h1>
	<div class="table-container">
		<div class="header">id</div>
		<div class="header">data</div>
		{#each biographies as biography}
			<div class="row cell">{biography.id}</div>
			<div class="row cell data">{biography.data}</div>
		{/each}
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
	.table-container {
		border: 1px solid lightgray;
		border-radius: 2px;
		display: grid;
		grid-template-columns: 70px auto;
		.header,
		.row {
			border: 1px solid lightgrey;
			text-align: center;
			padding: 10px;
		}
		.header {
			text-transform: uppercase;
			font-weight: 600;
		}
		.row {
			&.data {
				display: flex;
				justify-content: flex-end;
				text-align: right;
				align-items: center;
			}
		}
	}
	h1 {
		width: 100%;
	}
</style>
