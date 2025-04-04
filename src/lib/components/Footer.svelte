<script lang="ts">
	import type { LayoutData } from '../../routes/u/$types';
	let { data }: { data?: LayoutData } = $props();
</script>

<footer>
	<span class="copyright">CUIAL &copy; {new Date().getFullYear()}</span>
	<div class="links">
		<a href="https://github.com/savashn/cuial">Github</a>
		<a href="/contact">Contact</a>
		{#if data}
			<a href={`/u/${data.userId}`}>My Profile</a>
			<a href={`verify?logout=${data.userId}`}>Logout</a>
		{/if}
	</div>
</footer>

<style>
	footer {
		font-size: 1.2rem;
		margin-top: 20rem;
		margin-bottom: 2rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.copyright {
		margin-bottom: 1rem;
	}

	.links {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		gap: 1rem;
	}

	@media (max-width: 768px) {
		footer {
			margin-top: 15rem;
		}
	}
</style>
