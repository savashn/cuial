<script lang="ts">
	import type { PageProps } from './$types';
	import '$lib/styles/button.css';
	import RegisterForm from '$lib/components/RegisterForm.svelte';
	import LoginForm from '$lib/components/LoginForm.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data, form }: PageProps = $props();

	let login = $state(data.login);
	let register = $state(data.register);

	let isTransitioning = $state<boolean>(false);

	function openLogin() {
		if (isTransitioning) return;
		isTransitioning = true;
		register = false;

		setTimeout(() => {
			login = true;
			isTransitioning = false;
		}, 200);
	}

	function openRegister() {
		if (isTransitioning) return;
		isTransitioning = true;
		login = false;

		setTimeout(() => {
			register = true;
			isTransitioning = false;
		}, 200);
	}
</script>

<svelte:head>
	<title>CUIAL</title>
	<meta
		name="description"
		content="See You In Another Life. Send a last message to the people you love after you died."
	/>
</svelte:head>

<p>
	Imagine that you are dead now. What would your last words be to the people you've loved? Would
	they be 'I love you'? They might be, or they might not — death doesn't care. Death is real (more
	than life), is deaf, is near, and it never waits.
</p>

<br />
<h3>Leave A Last Message To The People You Love</h3>

<div class="buttons">
	<button onclick={() => openLogin()} class={login ? 'active' : ''}>LOGIN</button>
	<button onclick={() => openRegister()} class={register ? 'active' : ''}>REGISTER</button>
</div>

<div class="form-container">
	{#if register}
		<RegisterForm {form} />
	{:else if login}
		<LoginForm {form} />
	{/if}
</div>

<Footer />

<style>
	.form-container {
		width: 100%;
		max-width: 30rem;
		height: 20rem;
		display: flex;
		justify-content: center;
		align-items: center;
		grid: 2;
		margin: 1rem;
	}

	h3 {
		font-size: 2rem;
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		h3 {
			font-size: 1.75rem;
		}
	}
</style>
