<script lang="ts">
	import type { ActionData } from '../../routes/u/[user]/$types';
	import { fly } from 'svelte/transition';
	import '$lib/styles/form.css';

	let { form }: { form?: ActionData } = $props();
</script>

<form
	method="POST"
	action="?/password"
	in:fly={{ x: 200, duration: 200 }}
	out:fly={{ x: 200, duration: 200 }}
>
	{#if form?.formType === 'password' && form?.errors?.error}
		<div class="msg error">
			{form.errors.error}
		</div>
	{:else if form?.formType === 'password' && form?.msg}
		<div class="msg success">
			{form.msg}
		</div>
	{/if}

	<label>
		Old Password
		<br />
		<input
			name="oldPassword"
			type="password"
			class={form?.formType === 'password' && form?.errors?.oldPassword ? 'error' : ''}
			placeholder={form?.formType === 'password' && form?.errors?.oldPassword
				? form.errors.oldPassword
				: ''}
		/>
	</label>

	<label>
		New Password
		<br />
		<input
			name="newPassword"
			type="password"
			class={form?.formType === 'password' && form?.errors?.newPassword ? 'error' : ''}
			placeholder={form?.formType === 'password' && form?.errors?.newPassword
				? form.errors.newPassword
				: ''}
		/>
	</label>

	<label>
		New Password Again
		<br />
		<input
			name="rePassword"
			type="password"
			class={form?.formType === 'password' && form?.errors?.rePassword ? 'error' : ''}
			placeholder={form?.formType === 'password' && form?.errors?.rePassword
				? form.errors.rePassword
				: ''}
		/>
	</label>

	<div class="buttons">
		<button>Save Changes</button>
	</div>
</form>
