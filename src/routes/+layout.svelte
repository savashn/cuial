<script>
	let { children } = $props();
	import '$lib/global.css';
	import Header from '$lib/components/Header.svelte';
</script>

<Header />
<main>
	{@render children()}
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Spectral+SC:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

	:global(body) {
		line-height: 1.5;
		background-color: black;
		color: whitesmoke;
		min-height: 100vh;
		opacity: 0;
		animation: fadeInOpacity 2s forwards;
	}

	main {
		text-align: center;
		font-family: 'Spectral', serif;
		font-weight: 400;
		font-style: normal;
		font-size: 1.2rem;
		margin: -15rem auto;
		width: 60%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		min-height: 70vh;
	}

	@media (max-width: 768px) {
		main {
			width: 85%;
			margin: -12rem auto;
			font-size: 1rem;
		}
	}

	@keyframes fadeInOpacity {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	:global(a) {
		color: white;
		text-decoration: none;
		position: relative;
	}

	:global(a::after) {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: whitesmoke;
		transform: scaleX(0);
		transform-origin: center;
		transition: transform 0.3s ease;
	}

	:global(a:hover::after) {
		transform: scaleX(1);
	}
</style>
