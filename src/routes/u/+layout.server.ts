import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('x-auth-token') as string;

	if (!token) {
		redirect(302, '/');
	}

	const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
	const userId: string = decodedToken.id;

	return { userId };
};
