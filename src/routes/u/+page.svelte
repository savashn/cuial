<script lang="ts">
	import type { PageProps } from './$types';
	import '$lib/styles/button.css';
	import AddMessage from '$lib/components/AddMessage.svelte';
	import Messages from '$lib/components/Messages.svelte';

	let { data, form }: PageProps = $props();

	let letters = $state(data.letters);
	let newLetter = $state(data.newLetter);
	let isTransitioning = $state(false);

	function openLetters() {
		if (isTransitioning) return;
		isTransitioning = true;
		newLetter = false;

		setTimeout(() => {
			letters = true;
			isTransitioning = false;
		}, 200);
	}

	function openNewLetter() {
		if (isTransitioning) return;
		isTransitioning = true;
		letters = false;

		setTimeout(() => {
			newLetter = true;
			isTransitioning = false;
		}, 200);
	}
</script>

<svelte:head>
	<title>My Letters</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<div class="buttons">
	<button onclick={() => openLetters()} class={letters ? 'active' : ''}>MY LETTERS</button>
	<button onclick={() => openNewLetter()} class={newLetter ? 'active' : ''}>NEW LETTER</button>
</div>

{#if letters}
	<Messages {data} {form} />
{:else if newLetter}
	<AddMessage {form} />
{/if}
