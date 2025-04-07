<script lang="ts">
	import '$lib/styles/button.css';
	let { modal = $bindable(), text } = $props();

	let modalRef: HTMLDivElement | null = $state(null);

	$effect(() => {
		modalRef?.focus();
	});
</script>

<div
	class="overlay"
	role="button"
	tabindex="0"
	onclick={(e) => e.target === e.currentTarget && (modal = false)}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
			modal = false;
		}
	}}
>
	<div class="modal" tabindex="-1" bind:this={modalRef}>
		<p>{text}</p>
		<div class="buttons">
			<button
				type="button"
				class="button"
				style="border-color: rgb(4, 71, 94);"
				onclick={() => (modal = false)}
			>
				Cancel
			</button>
			<button type="submit" class="delete-btn" style="border-color: darkred" formaction="?/delete">
				Confirm
			</button>
		</div>
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal {
		background: rgb(17, 16, 16);
		padding: 2rem;
		border-radius: 12px;
		width: 90%;
		max-width: 400px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}
</style>
