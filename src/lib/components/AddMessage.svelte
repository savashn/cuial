<script lang="ts">
	import type { ActionData } from '../../routes/u/$types';
	import { fly } from 'svelte/transition';
	import '$lib/styles/form.css';
	import '$lib/styles/checkbox.css';

	let { form }: { form?: ActionData } = $props();
</script>

<form
	method="POST"
	action="?/post"
	in:fly={{ x: 200, duration: 200 }}
	out:fly={{ x: 200, duration: 200 }}
>
	{#if form?.formType === 'post' && form?.errors?.error}
		<div class="msg error">
			{form.errors.error}
		</div>
	{:else if form?.formType === 'post' && form?.msg}
		<div class="msg success">
			{form.msg}
		</div>
	{/if}

	<label>
		To
		<br />
		<input
			name="to"
			type="text"
			class={form?.formType === 'post' && form?.errors?.to ? 'error' : ''}
			placeholder={form?.formType === 'post' && form?.errors?.to ? form.errors.to : ''}
		/>
	</label>
	<label>
		Subject
		<br />
		<input
			name="subject"
			type="text"
			class={form?.formType === 'post' && form?.errors?.subject ? 'error' : ''}
			placeholder={form?.formType === 'post' && form?.errors?.subject ? form.errors.subject : ''}
		/>
	</label>
	<label>
		Text
		<br />
		<textarea
			name="text"
			class={form?.formType === 'post' && form?.errors?.text ? 'error' : ''}
			placeholder={form?.formType === 'post' && form?.errors?.text ? form.errors.text : ''}
		></textarea>
	</label>
	<div class="checkbox-container">
		<label class="checkbox-label">
			<input type="checkbox" name="sendInfo" value="true" class="checkbox-input" />
			<span class="checkbox-custom"></span>
			<span class="checkbox-text"
				>Send an information email to the receiver (it does not include your message)</span
			>
		</label>
	</div>
	<div class="checkbox-container">
		<label class="checkbox-label">
			<input type="checkbox" name="sendPreview" value="true" class="checkbox-input" />
			<span class="checkbox-custom"></span>
			<span class="checkbox-text">Send me a preview mail of my message</span>
		</label>
	</div>
	<button>SAVE</button>
</form>

<h3>IMPORTANT!</h3>
<p>
	All of your messages are stored in our database in an encrypted form. We use AES-256-GCM
	(Authenticated Encryption) + PBKDF2 Key Derivation Function (KDF) as encryption format to keep
	your messages safe. However, this is associated with TEXT label only.
</p>

<style>
	h3 {
		margin-top: 3rem;
		font-size: x-large;
		color: red;
	}
</style>
