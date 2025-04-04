import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { API_URI } from '$env/static/private';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const token = url.searchParams.get('token');

	const res = await fetch(`${API_URI}/check-token/${token}`);

	if (!res.ok) {
		const msg = await res.text();
		return { success: false, msg };
	}

	return { success: true, token };
};

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const token = data.get('token');
		const password = data.get('password');
		const rePassword = data.get('rePassword');

		const errors: Record<string, string> = {};

		if (!password) errors.password = 'Password is required';
		if (!rePassword) errors.rePassword = 'Password again is required';
		if (password !== rePassword) errors.rePassword = 'Passwords must match';

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors });
		}

		const res = await fetch(`${API_URI}/put/forgot-password`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token, password })
		});

		if (!res.ok) {
			const msg = await res.json();

			if (Array.isArray(msg)) {
				msg.forEach((err: { field: string; message: string }) => {
					errors[err.field] = err.message;
				});
			} else {
				errors.error = msg.message;
			}

			return fail(400, { errors });
		}

		return { success: true, msg: await res.text() };
	}
} satisfies Actions;
