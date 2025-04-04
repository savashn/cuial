<script lang="ts">
	import type { LayoutProps } from './$types';
	let { data, children }: LayoutProps = $props();
	import Footer from '$lib/components/Footer.svelte';
</script>

{@render children()}
<Footer {data} />
