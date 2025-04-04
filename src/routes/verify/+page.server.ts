import type { PageServerLoad } from './$types';
import { API_URI } from '$env/static/private';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const account = url.searchParams.get('account');
	const living = url.searchParams.get('living');
	const email = url.searchParams.get('email');
	const logout = url.searchParams.get('logout');

	if (account) {
		const res = await fetch(`${API_URI}/verify?account=${account}`);

		const msg = await res.text();

		if (!res.ok) {
			console.log(msg);
			return { success: false, msg };
		}

		return { success: true, msg };
	}

	if (living) {
		const res = await fetch(`${API_URI}/verify?living=${living}`);

		const msg = await res.text();

		if (!res.ok) {
			console.log(msg);
			return { success: false, msg };
		}

		return { success: true, msg };
	}

	if (email) {
		const res = await fetch(`${API_URI}/forgot-password?email=${email}`);

		const msg = await res.text();

		if (!res.ok) {
			console.log(msg);
			return { success: false, msg };
		}

		return { success: true, msg };
	}

	if (logout) {
		cookies.delete('x-auth-token', { path: '/' });
		return { success: true, msg: 'Logged out successfully' };
	}
};
