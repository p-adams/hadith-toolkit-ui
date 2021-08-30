<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';
	import { db } from '../firebase';
	interface Biography {
		id: string;
		data: string;
	}
	const PAGINATION_UPPER_LIMIT = 13076;

	let currentPage = 1;
	let rowCount = 100;

	let filtersAreVisible = false;

	function toggleFilters() {
		filtersAreVisible = !filtersAreVisible;
	}
	async function getBiographies(limit = 100): Promise<Array<Biography>> {
		const entries = await db.ref().limitToFirst(limit).once('value');
		const values = entries.val();
		return values.slice(Math.max(values.length - 100, 0));
	}

	function navigate(page: number) {
		rowCount = page * 100;
		getBiographies(rowCount);
	}

	$: currentPage = rowCount / 100;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<div class="table-actions">
		<div class="table-actions-container">
			<div class="search-filter">
				<button class="icon" title="search" on:click={() => alert('meow')}
					><i class="fas fa-search" /></button
				>
				<input placeholder="search" />
			</div>
			<div class="table-filter">
				{#if filtersAreVisible}
					<select>
						<option>a</option>
						<option>b</option>
						<option>c</option>
					</select>
					<select>
						<option>a</option>
						<option>b</option>
						<option>c</option>
					</select>
					<select>
						<option>a</option>
						<option>b</option>
						<option>c</option>
					</select>
				{/if}

				<button
					class={`icon ${filtersAreVisible ? 'active' : ''}`}
					on:click={() => toggleFilters()}
					title="filter"
				>
					<i class="fas fa-filter" />
				</button>
			</div>
		</div>
		<div class="pagination-container">
			<div>Page {currentPage} of about {PAGINATION_UPPER_LIMIT} results</div>
			<div class="navigation">
				<div class="previous">
					{#if currentPage > 1} previous{/if}
				</div>
				<div class="pages">
					{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as num}
						<div
							class={`page ${num === currentPage ? 'active' : ''}`}
							on:click={() => navigate(num)}
						>
							{num}
						</div>
					{/each}
				</div>
				<div class="next">next</div>
			</div>
		</div>
	</div>
	{#await getBiographies(rowCount)}
		<div class="loading-container">
			<p>loading...</p>
		</div>
	{:then biographies}
		<div class="table-container" in:fly={{ y: 200, duration: 500 }}>
			<div class="header">id</div>
			<div class="header">data</div>
			{#each biographies as biography}
				<div class="row cell">{Number.isInteger(parseInt(biography.id)) ? biography.id : '*'}</div>
				<div class="row cell data">{biography.data}</div>
			{/each}
		</div>
	{:catch error}
		<div class="loading-container error">
			<p>error {error.message}</p>
		</div>
	{/await}
</section>

<style lang="scss">
	$defaultTableHeight: 464px;
	$defaultTableWidth: 990px;
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
		min-height: 50px;
		outline: 1px solid lightgray;
		.table-actions-container {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 8px;
			border-right: 1px solid lightgray;
			button {
				cursor: pointer;
				&.icon {
					text-align: center;
					width: 40px;
					background-color: slategray;
					color: white;
					border: none;
				}
			}
			.search-filter {
				max-width: 584px;
				display: flex;
				justify-content: space-between;
				border: 1px solid lightgray;
				border-radius: 24px;
				input {
					border: none;
					border-radius: var(--input-border-radius);
					&:focus {
						outline: none;
					}
				}
				.icon {
					border-radius: var(--icon-border-radius);
					.fa-search {
						height: 100%;
						display: inline-block;
						color: white;
						font-size: 18px;
						line-height: 38px;
					}
				}
			}
			.table-filter {
				button {
					&.icon {
						height: 30px;
						border-radius: 2px;
						&.active {
							color: slategray;
							background-color: white;
							box-shadow: inset 0 0 16px lightgray;
							border: 1px solid #64b5f6;
						}
					}
				}
			}
		}
		.pagination-container {
			display: flex;
			flex-direction: column;
			text-align: left;
			padding: 10px;
			.navigation {
				display: flex;
				.previous {
					cursor: pointer;
					margin-right: 25px;
				}
				.next {
					cursor: pointer;
					margin-left: 25px;
				}
				.pages {
					display: flex;
					width: 150px;
					justify-content: space-between;
					.page {
						cursor: pointer;
						&.active {
							text-decoration: underline;
							color: blue;
						}
					}
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
		height: 550px;
		overflow-y: scroll;
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
	.loading-container {
		min-height: $defaultTableHeight;
		min-width: $defaultTableWidth;
		text-align: center;
		p {
			font-size: 32px;
			text-transform: uppercase;
		}
	}
</style>
