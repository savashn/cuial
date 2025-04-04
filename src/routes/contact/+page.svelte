<script lang="ts">
	import type { ActionData } from '../../routes/contact/$types';
	import { fly } from 'svelte/transition';
	import '$lib/styles/form.css';
	import '$lib/styles/button.css';

	let { form }: { form: ActionData } = $props();
</script>

<form method="POST" in:fly={{ x: 200, duration: 200 }} out:fly={{ x: 200, duration: 200 }}>
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
