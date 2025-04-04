import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { API_URI } from '$env/static/private';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const message = data.get('message');

		const errors: Record<string, string> = {};

		if (!name) errors.name = 'Name is required';
		if (!message) errors.message = 'Message is required';

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors });
		}

		const formData = {
			name,
			email: email && email.toString().trim() !== '' ? email : null,
			message
		};

		const res = await fetch(`${API_URI}/post/contact`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
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
