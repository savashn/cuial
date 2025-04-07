import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { API_URI } from '$env/static/private';

let login: boolean = true;
let register: boolean = false;

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('x-auth-token');

	if (token) {
		redirect(302, `/u`);
	}

	return { login, register };
};

export const actions = {
	register: async ({ request, fetch }) => {
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const password = data.get('password');
		const rePassword = data.get('rePassword');

		const errors: Record<string, string> = {};

		if (!name) errors.name = 'Name is required';
		if (!email) errors.email = 'Email is required';
		if (!password) errors.password = 'Password is required';
		if (!rePassword) errors.rePassword = 'Password again is required';
		if (password !== rePassword) errors.rePassword = 'Passwords must match';

		if (Object.keys(errors).length > 0) {
			return (register = true), (login = false), fail(400, { errors, formType: 'register' });
		}

		const res = await fetch(`${API_URI}/post/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, password })
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

			return (register = true), (login = false), fail(400, { errors, formType: 'register' });
		}

		return { register: false, login: true, formType: 'login', msg: await res.text() };
	},
	login: async ({ request, fetch, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const errors: Record<string, string> = {};

		if (!email) errors.email = 'Email is required';
		if (!password) errors.password = 'Password is required';

		if (Object.keys(errors).length > 0) {
			return (login = true), (register = false), fail(400, { errors, formType: 'login' });
		}

		const postData = {
			email,
			password
		};

		const res = await fetch(`${API_URI}/post/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postData)
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

			return (login = true), (register = false), fail(400, { errors, formType: 'login' });
		}

		const token = await res.text();
		cookies.set('x-auth-token', token, { path: '/', httpOnly: true, maxAge: 86400 });

		redirect(302, `/u`);
	}
} satisfies Actions;
