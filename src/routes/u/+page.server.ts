import type { PageServerLoad } from './$types';
import { API_URI } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

let letters = true;
let newLetter = false;

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	const token = cookies.get('x-auth-token');

	if (!token) {
		redirect(304, '/');
	}

	const res = await fetch(`${API_URI}/messages`, {
		method: 'GET',
		headers: { 'x-auth-token': `${token}` }
	});

	const data = await res.json();

	return {
		data,
		letters,
		newLetter
	};
};

export const actions = {
	post: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const title = data.get('title');
		const to = data.get('to');
		const subject = data.get('subject');
		const text = data.get('text');

		const token = cookies.get('x-auth-token');

		const errors: Record<string, string> = {};

		if (!title) errors.title = 'Message title is required';
		if (!to) errors.to = 'To is required';
		if (!subject) errors.subject = 'Subject is required';
		if (!text) errors.text = 'Text is required';

		if (Object.keys(errors).length > 0) {
			return (newLetter = true), (letters = false), fail(400, { errors, formType: 'post' });
		}

		const res = await fetch(`${API_URI}/post/message`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
			body: JSON.stringify({ title, to, subject, text })
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

			return (newLetter = true), (letters = false), fail(400, { errors, formType: 'post' });
		}

		return { formType: 'post', msg: await res.text() };
	},
	put: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const id = data.get('id');
		const title = data.get('title');
		const to = data.get('to');
		const subject = data.get('subject');
		const text = data.get('text');

		const token = cookies.get('x-auth-token');

		const errors: Record<string, string> = {};

		if (!title) errors.title = 'Message title is required';
		if (!to) errors.to = 'To is required';
		if (!subject) errors.subject = 'Subject is required';
		if (!text) errors.text = 'Text is required';

		if (Object.keys(errors).length > 0) {
			return (newLetter = true), (letters = false), fail(400, { errors, formType: 'put' });
		}

		const res = await fetch(`${API_URI}/put/message`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
			body: JSON.stringify({ id, title, to, subject, text })
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

			return (newLetter = false), (letters = true), fail(400, { errors, formType: 'put' });
		}

		return { msg: await res.text() };
	},
	delete: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const id = data.get('id');

		const errors: Record<string, string> = {};

		const token = cookies.get('x-auth-token');

		const res = await fetch(`${API_URI}/delete/message`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
			body: JSON.stringify({ id })
		});

		const msg = await res.text();

		if (!res.ok) {
			errors.error = msg;
			return fail(400, { errors, formType: 'put' });
		}

		return { success: true, msg };
	}
} satisfies Actions;
