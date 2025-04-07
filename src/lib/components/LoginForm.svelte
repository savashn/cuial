<script lang="ts">
	import type { ActionData } from '../../routes/$types';
	import { fly } from 'svelte/transition';
	import '$lib/styles/form.css';
	import { goto } from '$app/navigation';

	let { form }: { form?: ActionData } = $props();

	let email = $state('');
	let emailError = $state('');

	function handleForgotPassword() {
		if (!email.trim()) {
			emailError = 'Please enter your email before proceeding';
		} else {
			goto(`/verify?email=${email}`);
		}
	}
</script>

<form
	method="POST"
	action="?/login"
	in:fly={{ x: -200, duration: 300 }}
	out:fly={{ x: -200, duration: 200 }}
>
	{#if form?.errors?.error && form?.formType === 'login'}
		<div class="msg error">
			{form.errors.error}
		</div>
	{:else if emailError}
		<div class="msg error">
			{emailError}
		</div>
	{:else if form?.msg && form?.formType === 'login'}
		<div class="msg success">
			{form.msg}
		</div>
	{/if}
	<label>
		Email
		<br />
		<input
			name="email"
			type="email"
			bind:value={email}
			class={form?.errors?.email && form.formType === 'login' ? 'error' : ''}
			placeholder={form?.formType === 'login' && form?.errors?.email ? form.errors.email : ''}
		/>
	</label>
	<label>
		Password
		<br />
		<input
			name="password"
			type="password"
			class={form?.errors?.password && form?.formType === 'login' ? 'error' : ''}
			placeholder={form?.formType === 'login' && form?.errors?.password ? form.errors.password : ''}
		/>
	</label>
	<button type="button" class="forgot" onclick={handleForgotPassword}>Forgot my password</button>
	<button>LOGIN</button>
</form>

<style>
	.forgot {
		width: 50%;
		margin: auto;
		color: white;
		text-decoration: none;
		position: relative;
		border: none;
		font-size: large;
	}

	.forgot:hover {
		background-color: transparent;
	}

	.forgot::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: whitesmoke;
		transform: scaleX(0);
		transform-origin: center;
		transition: transform 0.3s ease;
	}

	.forgot:hover::after {
		transform: scaleX(1);
	}
</style>
