<script lang="ts">
	import { fly } from 'svelte/transition';
	import '$lib/styles/form.css';

	let { form } = $props();
</script>

<form
	method="POST"
	action="?/register"
	class="register-form"
	in:fly={{ x: 200, duration: 200 }}
	out:fly={{ x: 200, duration: 200 }}
>
	{#if form?.formType === 'register' && form?.errors?.error}
		<div class="msg error">
			{form.errors.error}
		</div>
	{:else if form?.formType === 'register' && form?.msg}
		<div class="msg success">
			{form.msg}
		</div>
	{/if}

	<div class="form-group">
		<label>
			Name
			<br />
			<input
				name="name"
				type="text"
				class={form?.errors?.name && form.formType === 'register' ? 'error' : ''}
				placeholder={form?.formType === 'register' && form?.errors?.name ? form.errors.name : ''}
			/>
		</label>
		<label>
			Email
			<br />
			<input
				name="email"
				type="email"
				class={form?.errors?.email && form.formType === 'register' ? 'error' : ''}
				placeholder={form?.formType === 'register' && form?.errors?.email ? form.errors.email : ''}
			/>
		</label>
	</div>
	<div class="form-group">
		<label>
			Password
			<br />
			<input
				name="password"
				type="password"
				class={form?.errors?.password && form.formType === 'register' ? 'error' : ''}
				placeholder={form?.formType === 'register' && form?.errors?.password
					? form.errors.password
					: ''}
			/>
		</label>
		<label>
			Password again
			<br />
			<input
				name="rePassword"
				type="password"
				class={form?.errors?.rePassword && form.formType === 'register' ? 'error' : ''}
				placeholder={form?.formType === 'register' && form?.errors?.rePassword
					? form.errors.rePassword
					: ''}
			/>
		</label>
	</div>
	<button>Register</button>
</form>

<style>
	.register-form {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 30rem;
		margin: auto;
	}

	.form-group {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	@media (max-width: 768px) {
		.register-form {
			width: 70%;
		}

		.form-group {
			grid-template-columns: 1fr;
			gap: 0;
		}
	}
</style>
