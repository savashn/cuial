import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { API_URI } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';

type Data = {
	name: string;
	email: string;
	notification: number;
	confirmation: number;
};

let editProfile = true;
let changePassword = false;

export const load: PageServerLoad = async ({ params, cookies, fetch }) => {
	const token = cookies.get('x-auth-token');

	const res = await fetch(`${API_URI}/users/${params.user}`, {
		method: 'GET',
		headers: { 'x-auth-token': `${token}` }
	});

	const data: Data = await res.json();

	return {
		data,
		editProfile,
		changePassword
	};
};

export const actions = {
	profile: async ({ request, fetch, cookies, params }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const email = data.get('email') as string;
		const notification = Number(data.get('notification'));
		const confirmation = Number(data.get('confirmation'));

		const token = cookies.get('x-auth-token');

		const errors: Record<string, string> = {};

		if (name.trim() === '') errors.name = 'Name is required';
		if (email.trim() === '') errors.email = 'Email is required';

		if (Object.keys(errors).length > 0) {
			return (changePassword = false), (editProfile = true), fail(400, { errors });
		}

		const res = await fetch(`${API_URI}/put/user/${params.user}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
			body: JSON.stringify({ name, email, notification, confirmation })
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

			return (
				(changePassword = false), (editProfile = true), fail(400, { errors, formType: 'profile' })
			);
		}

		return { changePassword: false, editProfile: true, msg: await res.text(), formType: 'profile' };
	},
	delete: async ({ fetch, cookies, params }) => {
		const errors: Record<string, string> = {};

		const token = cookies.get('x-auth-token');

		const res = await fetch(`${API_URI}/delete/user/${params.user}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` }
		});

		const msg = await res.text();

		if (!res.ok) {
			errors.error = msg;
			return (
				(changePassword = false), (editProfile = true), fail(400, { errors, formType: 'profile' })
			);
		}

		cookies.delete('x-auth-token', { path: '/' });

		redirect(302, '/');
	},
	password: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const oldPassword = data.get('oldPassword') as string;
		const newPassword = data.get('newPassword') as string;
		const rePassword = data.get('rePassword') as string;

		const token = cookies.get('x-auth-token');
		const errors: Record<string, string> = {};

		if (newPassword && rePassword && oldPassword && newPassword.trim() === '')
			errors.newPassword = 'Password is required';
		if (newPassword && rePassword && oldPassword && newPassword !== rePassword)
			errors.rePassword = 'Passwords must match';

		if (Object.keys(errors).length > 0) {
			return (
				(editProfile = false), (changePassword = true), fail(400, { errors, formType: 'password' })
			);
		}

		const res = await fetch(`${API_URI}/put/password`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
			body: JSON.stringify({ newPassword, oldPassword })
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

			return (
				(editProfile = false), (changePassword = true), fail(400, { errors, formType: 'password' })
			);
		}

		return { editProfile: true, changePassword: true, msg: await res.text(), formType: 'password' };
	}
} satisfies Actions;
