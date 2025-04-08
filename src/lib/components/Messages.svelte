<script lang="ts">
	import type { PageProps } from '../../routes/u/$types';
	import { applyAction, enhance } from '$app/forms';
	import { fly } from 'svelte/transition';
	import Modal from './Modal.svelte';
	import '$lib/styles/button.css';
	import '$lib/styles/checkbox.css';

	let { data, form }: PageProps = $props();

	let modal = $state(false);

	let openId = $state<string | null>(null);
	let editingId = $state<number | null>(null);

	let editedValues = $state<Record<string, { to: string; subject: string; text: string }>>({});

	function startEditing(id: number, to: string, subject: string, text: string) {
		editingId = id;
		editedValues[id] = { to, subject, text };
	}
</script>

<div class="wrapper" in:fly={{ x: -200, duration: 200 }} out:fly={{ x: -200, duration: 200 }}>
	{#if data.data.length === 0}
		No messages found
	{/if}

	{#each data.data as v (v.id)}
		<div class="accordion">
			<button
				class={`accordion-header ${openId === v._id ? 'active' : ''}`}
				onclick={() => (openId = openId === v._id ? null : v._id)}
			>
				<p>{v.subject}</p>
				<span>{openId === v._id ? '▲' : '▼'}</span>
			</button>
			<div class="accordion-content" style="max-height: {openId === v._id ? '100vh' : '0'};">
				<br />
				{#if editingId === v._id}
					<!-- Editing Mode -->

					<form
						action="?/put"
						method="POST"
						use:enhance={() => {
							return async ({ result, update }) => {
								if (result.type === 'success') {
									editingId = null;
									update();
								} else {
									await applyAction(result);
								}
							};
						}}
					>
						{#if form?.formType === 'put' && form?.errors}
							<div class="msg error">
								{#each Object.values(form.errors) as message (message)}
									<p>{message}</p>
								{/each}
							</div>
						{:else if form?.formType === 'put' && form?.msg}
							<div class="msg success">
								{form.msg}
							</div>
						{/if}

						<input type="hidden" name="id" value={v._id} />

						<label>
							To
							<br />
							<input
								name="to"
								type="to"
								value={v.to}
								class={form?.formType === 'put' && form?.errors?.to ? 'error' : ''}
								placeholder={form?.formType === 'put' && form?.errors?.to ? form.errors.to : ''}
							/>
						</label>

						<label>
							Subject
							<br />
							<input
								name="subject"
								type="subject"
								value={v.subject}
								class={form?.formType === 'put' && form?.errors?.subject ? 'error' : ''}
								placeholder={form?.formType === 'put' && form?.errors?.subject
									? form.errors.subject
									: ''}
							/>
						</label>

						<label>
							Text
							<br />
							<textarea
								name="text"
								value={v.text}
								class={form?.formType === 'put' && form?.errors?.text ? 'error' : ''}
								placeholder={form?.formType === 'put' && form?.errors?.text ? form.errors.text : ''}
							></textarea>
						</label>

						<div class="checkbox-container">
							<label class="checkbox-label">
								<input type="checkbox" name="sendPreview" value="true" class="checkbox-input" />
								<span class="checkbox-custom"></span>
								<span class="checkbox-text">Send me a preview mail of my message</span>
							</label>
						</div>

						<div class="buttons">
							<button type="submit" class="save-btn">SAVE</button>
							<button type="submit" onclick={() => (editingId = null)}>CANCEL</button>
							<button type="button" class="delete-btn" onclick={() => (modal = true)}>
								DELETE
							</button>
						</div>

						{#if modal}
							<Modal bind:modal text="Are you sure you want to delete this message?" />
						{/if}
					</form>
				{:else}
					<!-- Normal Mode -->
					<p><span class="bold">To:</span> {v.to}</p>
					<p><span class="bold">Subject:</span> {v.subject}</p>
					<span class="bold">Text:</span>
					<p class="text">{v.text}</p>
					<div class="buttons">
						<button onclick={() => startEditing(v._id, v.to, v.subject, v.text)}>EDIT</button>
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.text {
		white-space: pre-wrap;
		font-size: 1.4rem;
		word-wrap: break-word;
		max-width: 100%;
		overflow-wrap: break-word;
		margin: 10px 0;
		text-align: left;
	}

	.bold {
		font-weight: bold;
	}

	.wrapper {
		margin-top: 3rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	button {
		margin: 0;
	}

	.accordion {
		overflow: hidden;
		width: 100%;
	}

	.accordion-header {
		background-color: transparent;
		color: black;
		padding: 1rem;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		outline: none;
		text-align: left;
		font-size: 1rem;
		font-weight: bold;
		border: 1px solid white;
		color: white;
		border-radius: 2px;
		transition: all 0.3s ease-in-out;
	}

	.accordion-header:hover {
		background-color: rgb(28, 43, 46);
	}

	.active {
		background-color: rgb(28, 43, 46);
	}

	.accordion-content {
		padding: 0 1rem;
		overflow: hidden;
		transition: max-height 0.4s ease-out;
		background: transparent;
		color: white;
		border: 1px solid white;
		border-radius: 2px;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
	}

	@media (max-width: 768px) {
		.accordion {
			width: 100%;
		}
	}
</style>
