<script lang="ts">
	import type { ActionData, PageData } from '../../routes/contact/$types';
	import { fly } from 'svelte/transition';
	import '$lib/styles/form.css';
	import '$lib/styles/button.css';
	import Footer from '$lib/components/Footer.svelte';

	let { data, form }: { data?: PageData; form: ActionData } = $props();
</script>

<h3 class="contact">Get In Touch</h3>
<p>
	Have a question or just want to say hello? Fill out the form below and we’ll get back to you as
	soon as possible.
</p>

<br />

<form
	method="POST"
	in:fly={{ x: 200, duration: 200 }}
	out:fly={{ x: 200, duration: 200 }}
	style="min-height: 100vh;"
>
	{#if form?.errors?.error}
		<div class="msg error">
			{form.errors.error}
		</div>
	{:else if form?.msg}
		<div class="msg success">
			{form.msg}
		</div>
	{/if}

	<label>
		Name
		<br />
		<input
			name="name"
			type="text"
			class={form?.errors?.name ? 'error' : ''}
			placeholder={form?.errors?.name ? form.errors.name : ''}
		/>
	</label>

	<label>
		Email
		<br />
		<input
			name="email"
			type="text"
			class={form?.errors?.email ? 'error' : ''}
			placeholder={form?.errors?.email ? form.errors.email : ''}
		/>
	</label>

	<label>
		Your message
		<br />
		<textarea
			name="message"
			class={form?.errors?.message ? 'error' : ''}
			placeholder={form?.errors?.message ? form.errors.message : ''}
		></textarea>
	</label>

	<div class="buttons">
		<button>Send Message</button>
	</div>
</form>

<Footer userId={data?.userId} />

<style>
	.contact {
		font-size: 1.7rem;
		text-decoration: underline;
		margin-bottom: 1rem;
	}
</style>
