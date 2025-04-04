<script lang="ts">
	import type { PageProps } from '../../routes/u/$types';
	import { fly } from 'svelte/transition';
	import '$lib/styles/button.css';

	let { data, form }: PageProps = $props();

	let openId = $state<string | null>(null);
	let editingId = $state<number | null>(null);

	let editedValues = $state<
		Record<string, { title: string; to: string; subject: string; text: string }>
	>({});

	function startEditing(id: number, title: string, to: string, subject: string, text: string) {
		editingId = id;
		editedValues[id] = { title, to, subject, text };
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
				<p>{v.title}</p>
				<span>{openId === v._id ? '▲' : '▼'}</span>
			</button>
			<div class="accordion-content" style="max-height: {openId === v._id ? '100vh' : '0'};">
				<br />
				{#if editingId === v._id}
					<!-- Editing Mode -->

					<form action="?/put" method="POST">
						{#if form?.formType === 'put' && form?.errors?.error}
							<div class="msg error">
								{form.errors.error}
							</div>
						{:else if form?.formType === 'put' && form?.msg}
							<div class="msg success">
								{form.msg}
							</div>
						{/if}

						<input type="hidden" name="id" value={v._id} />

						<label>
							Title
							<br />
							<input
								name="title"
								type="title"
								value={v.title}
								class={form?.formType === 'put' && form?.errors?.title ? 'error' : ''}
								placeholder={form?.formType === 'put' && form?.errors?.title
									? form.errors.title
									: ''}
							/>
						</label>

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

						<div class="buttons">
							<button class="save-btn">Save</button>
							<button onclick={() => (editingId = null)}>Cancel</button>
							<button class="delete-btn" formaction="?/delete">Delete</button>
						</div>
					</form>
				{:else}
					<!-- Normal Mode -->
					<p><span class="bold">To:</span> {v.to}</p>
					<p><span class="bold">Subject:</span> {v.subject}</p>
					<span class="bold">Text:</span>
					<p class="text">{v.text}</p>
					<div class="buttons">
						<button onclick={() => startEditing(v._id, v.title, v.to, v.subject, v.text)}
							>Edit</button
						>
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
