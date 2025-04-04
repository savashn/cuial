<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let countdown = $state(5);

	$effect(() => {
		const interval = setInterval(() => {
			countdown--;
			if (countdown === 0) {
				clearInterval(interval);
				goto('/');
			}
		}, 1000);
	});
</script>

{#if data.msg}
	<div class="notification {data.success ? 'success' : 'error'}">
		{data.msg}
		<br />

		Redirecting in {countdown}...
	</div>
{/if}

<style>
	.notification {
		padding: 10px 20px;
		border-radius: 5px;
		color: white;
		width: 70%;
	}

	.success {
		background-color: darkgreen;
	}

	.error {
		background-color: darkred;
	}
</style>
