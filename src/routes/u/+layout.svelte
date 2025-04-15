<script lang="ts">
	import type { LayoutProps } from './$types';
	let { data, children }: LayoutProps = $props();
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="container">
	{@render children()}
</div>
<Footer userId={data?.userId} />

<style>
	.container {
		min-height: 70vh;
		display: flex;
		justify-content: top;
		align-items: center;
		flex-direction: column;
	}
</style>
