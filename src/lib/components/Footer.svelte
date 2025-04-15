<script lang="ts">
	let props = $props();
	const userId: string = props.userId;
</script>

<footer>
	<span class="copyright">CUIAL &copy; {new Date().getFullYear()}</span>
	<div class="links">
		{#if userId}
			<a href="/u">Messages</a>
			<a href={`/u/${userId}`}>Profile</a>
			<a href="/contact">Contact</a>
			<a href="https://github.com/savashn/cuial">Github</a>
			<a href={`/verify?logout=${userId}`}>Logout</a>
		{:else}
			<a href="/">Homepage</a>
			<a href="/contact">Contact</a>
			<a href="https://github.com/savashn/cuial">Github</a>
		{/if}
	</div>
</footer>

<style>
	footer {
		font-size: 1.2rem;
		margin: 5rem auto 2rem auto;
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
			font-size: 1rem;
		}
	}
</style>
