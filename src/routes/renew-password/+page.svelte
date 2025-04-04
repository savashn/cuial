<script lang="ts">
	import type { PageProps } from './$types';
	import '../../lib/styles/form.css';
	import '../../lib/styles/button.css';
	// import { goto } from '$app/navigation';

	let { data, form }: PageProps = $props();
	let countdown = $state(5);
	let showForm = $state(true);

	$effect(() => {
		if (form?.msg) {
			showForm = false;
			const interval = setInterval(() => {
				countdown--;
				if (countdown === 0) {
					clearInterval(interval);
					// goto('/'); // Yönlendirme işlemi aktif edilebilir
				}
			}, 1000);
		}
	});
</script>

{#if !data.success}
	<div class="notification {data.success ? 'successMsg' : 'errorMsg'}">
		{data.msg}
		<br />
		Redirecting in {countdown} seconds...
	</div>
{:else if data.success}
	{#if showForm}
		<form method="POST">
			<input type="hidden" name="token" value={data.token} />

			<label>
				New Password
				<br />
				<input
					name="password"
					type="password"
					class={form?.errors?.password ? 'error' : ''}
					placeholder={form?.errors?.password ? form.errors.password : ''}
				/>
			</label>

			<label>
				New Password Again
				<br />
				<input
					name="rePassword"
					type="password"
					class={form?.errors?.rePassword ? 'error' : ''}
					placeholder={form?.errors?.rePassword ? form.errors.rePassword : ''}
				/>
			</label>
			<button>Change the password</button>
		</form>
	{:else}
		<div class="notification {form?.success ? 'successMsg' : 'errorMsg'}">
			{form?.msg} <br />
			Redirecting in {countdown} seconds...
		</div>
	{/if}
{/if}

<style>
	.notification {
		padding: 10px 20px;
		border-radius: 5px;
		color: white;
		width: 70%;
	}

	.successMsg {
		background-color: darkgreen;
	}

	.errorMsg {
		background-color: darkred;
	}
</style>
