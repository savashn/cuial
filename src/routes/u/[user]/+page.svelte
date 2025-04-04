<script lang="ts">
	import type { PageProps } from './$types';
	import '$lib/styles/button.css';
	import '$lib/styles/form.css';
	import EditProfile from '$lib/components/EditProfile.svelte';
	import ChangePassword from '$lib/components/ChangePassword.svelte';

	let { data, form }: PageProps = $props();

	let editProfile = $state(data.editProfile);
	let changePassword = $state(data.changePassword);
	let isTransitioning = $state(false);

	function openProfile() {
		if (isTransitioning) return;
		isTransitioning = true;
		changePassword = false;

		setTimeout(() => {
			editProfile = true;
			isTransitioning = false;
		}, 200);
	}

	function openPassword() {
		if (isTransitioning) return;
		isTransitioning = true;
		editProfile = false;

		setTimeout(() => {
			changePassword = true;
			isTransitioning = false;
		}, 200);
	}
</script>

<div class="buttons">
	<button onclick={() => openProfile()} class={editProfile ? 'active' : ''}> Edit Profile </button>
	<button onclick={() => openPassword()} class={changePassword ? 'active' : ''}>
		Change Password
	</button>
</div>

{#if editProfile}
	<EditProfile {data} {form} />
{:else if changePassword}
	<ChangePassword {form} />
{/if}
