<script lang="ts">
	import { onMount } from 'svelte';
	let tableRef;
	let table: string[][] = [];
	onMount(() => {
		let rows = 7;
		let cols = 7;
		for (let i = 0; i < rows; i++) {
			table[i] = [];
			for (let j = 0; j < cols; j++) {
				table[i][j] = '';
			}
		}
		tableRef.style.setProperty('--colNum', cols);
		tableRef.style.setProperty('--rowNum', rows);
	});
</script>

<div class="sanad-tree-wrapper" bind:this={tableRef}>
	{#if table}
		{#each table as col}
			{#each col as r}
				<div class="cell">{r}</div>
			{/each}
		{/each}
	{/if}
</div>

<style lang="scss">
	:root {
		--color: green;
		--colNum: 1;
		--rowNum: 1;
	}
	.sanad-tree-wrapper {
		display: grid;
		grid-template-columns: repeat(var(--colNum), auto);
		grid-template-rows: repeat(var(--rowNum), auto);
	}
	.cell {
		border: 1px solid var(--color);
		grid-column-start: auto;
		grid-row-start: auto;
		width: 50px;
		height: 50px;
	}
</style>
