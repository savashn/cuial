<script lang="ts">
	import type { PageProps } from '../../routes/u/[user]/$types';
	import '$lib/styles/button.css';
	import '$lib/styles/form.css';
	import { fly } from 'svelte/transition';

	let { data, form }: PageProps = $props();
</script>

<form
	method="POST"
	action="?/profile"
	in:fly={{ x: -200, duration: 200 }}
	out:fly={{ x: -200, duration: 200 }}
>
	{#if form?.formType === 'profile' && form?.errors?.error}
		<div class="msg error">
			{form.errors.error}
		</div>
	{:else if form?.formType === 'profile' && form?.msg}
		<div class="msg success">
			{form.msg}
		</div>
	{/if}

	<label>
		Name
		<br />
		<input
			name="name"
			type="name"
			value={data.data.name}
			class={form?.errors?.name ? 'error' : ''}
			placeholder={form?.errors?.name ? form.errors.name : ''}
		/>

		{#if form?.errors?.name}
			<br /><br />
			<span class="error msg">{form.errors.name}</span>
		{/if}
	</label>

	<label>
		Email
		<br />
		<input
			name="email"
			type="email"
			value={data.data.email}
			class={form?.errors?.email ? 'error' : ''}
			placeholder={form?.errors?.email ? form.errors.email : ''}
		/>

		{#if form?.errors?.email}
			<br /><br />
			<span class="error msg">{form.errors.email}</span>
		{/if}
	</label>

	<label>
		Send me a confirmation email within (days)*:
		<input
			type="number"
			name="notification"
			min="1"
			value={data.data.notification}
			class={form?.errors?.notification ? 'error' : ''}
		/>
		{#if form?.errors?.notification}
			<br /><br />
			<span class="error msg">{form.errors.notification}</span>
		{/if}
	</label>

	<label>
		Wait for confirmation during (days)**:
		<input
			type="number"
			name="confirmation"
			min="1"
			value={data.data.confirmation}
			class={form?.errors?.confirmation ? 'error' : ''}
		/>

		{#if form?.errors?.confirmation}
			<br /><br />
			<span class="error msg">{form.errors.confirmation}</span>
		{/if}
	</label>

	<div class="buttons">
		<button>Save Changes</button>
		<button class="delete-btn" formaction="?/delete">Delete My Account</button>
	</div>
</form>

<div class="info">
	<p>
		* A countdown to check if you are alive. You will receive an email when the countdown is over.
		30 days by default.
	</p>
	<p>** A countdown to confirm that you are still alive. 3 day by default.</p>
</div>

<style>
	.info {
		display: flex;
		flex-direction: column;
		width: 90%;
		margin-top: 2rem;
		gap: 1rem;
	}

	@media (max-width: 768px) {
		.info {
			font-size: 1.2rem;
		}
	}
</style>
