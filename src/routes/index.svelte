<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { db } from '../firebase';
	interface Biography {
		id: string;
		data: string;
	}

	async function getBiographies(limit = 10): Promise<Array<Biography>> {
		const entries = await db.ref().limitToFirst(10).once('value');
		return entries.val();
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<div class="table-actions">
		<div class="search-filter">
			<input placeholder="search" />
			<button class="icon" title="search" on:click={() => alert('meow')}
				><i class="fas fa-search" /></button
			>
		</div>
	</div>
	{#await getBiographies()}
		<p>loading...</p>
	{:then biographies}
		<div class="table-container">
			<div class="header">id</div>
			<div class="header">data</div>
			{#each biographies as biography}
				<div class="row cell">{Number.isInteger(parseInt(biography.id)) ? biography.id : '-'}</div>
				<div class="row cell data">{biography.data}</div>
			{/each}
		</div>
	{:catch error}
		<p>error</p>
	{/await}
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
	.table-actions {
		position: sticky;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		width: 100%;
		height: 40px;
		outline: 1px solid lightgray;
		padding: 10px;
		.search-filter {
			display: flex;
			justify-content: space-between;
			border: 1px solid lightgray;
			border-radius: 4px;
			input {
				border: none;
				border-radius: 4px 0 4px 4px;
				&:focus {
					outline: none;
				}
			}
			.icon {
				text-align: center;
				width: 40px;
				background-color: slategray;
				border: none;
				.fa-search {
					height: 100%;
					display: inline-block;
					color: white;
					font-size: 18px;
					line-height: 38px;
				}
			}
		}
	}
	.table-container {
		border: 1px solid lightgray;
		border-radius: 2px;
		display: grid;
		grid-template-columns: 70px auto;
		margin-top: 20px;
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
</style>
