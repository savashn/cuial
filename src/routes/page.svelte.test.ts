import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import Page from './+page.svelte';
import RegisterForm from '$lib/components/RegisterForm.svelte';
import { vi } from 'vitest';

vi.mock('svelte/transition', () => ({
	fly: vi.fn()
}));

describe('/+page.svelte', () => {
	test('should render buttons', async () => {
		const props = {
			data: {
				login: true,
				register: false
			},
			form: {
				errors: {},
				formType: 'login'
			}
		};

		render(Page, { props });

		expect(screen.queryByText('Leave A Last Message To The People You Love')).toBeInTheDocument();

		const buttons = screen.getAllByRole('button');
		expect(buttons.length).toBeGreaterThan(0);

		const loginButton = buttons[0];
		const registerButton = buttons[1];

		expect(loginButton).toHaveTextContent('Login');
		expect(registerButton).toHaveTextContent('Register');

		expect(loginButton).toHaveClass('active');
		expect(registerButton).not.toHaveClass('active');
	});

	test('should open the register form', async () => {
		const props = {
			data: {
				login: true,
				register: false
			},
			form: {
				errors: {},
				formType: 'login'
			}
		};

		const { container } = render(Page, { props });

		const buttons = screen.getAllByRole('button');
		const loginButton = buttons[0];
		const registerButton = buttons[1];

		await fireEvent.click(registerButton);

		await waitFor(() => {
			expect(registerButton).toHaveClass('active');
			expect(loginButton).not.toHaveClass('active');
		});

		const form = container.querySelector('form');
		await waitFor(() => {
			expect(form).toBeInTheDocument();
		});
	});

	test('Should open the login form', async () => {
		const props = {
			data: {
				login: false,
				register: true
			},
			form: {
				errors: {},
				formType: 'register'
			}
		};

		const { container } = render(Page, { props });

		const buttons = screen.getAllByRole('button');
		const loginButton = buttons[0];
		const registerButton = buttons[1];

		await fireEvent.click(loginButton);

		await waitFor(() => {
			expect(loginButton).toHaveClass('active');
			expect(registerButton).not.toHaveClass('active');
		});

		const form = container.querySelector('form');
		await waitFor(() => {
			expect(form).toBeInTheDocument();
		});
	});
});

describe('/RegisterForm', () => {
	test('Should render the register page', async () => {
		render(RegisterForm);

		const registerButton = screen.getByRole('button', { name: 'Register' });

		expect(registerButton).toBeInTheDocument();

		const name = screen.getByLabelText(/name/i);
		const email = screen.getByLabelText(/email/i);
		const password = screen.getByLabelText(/password/i, { selector: 'input[name="password"]' });
		const rePassword = screen.getByLabelText(/password again/i, {
			selector: 'input[name="rePassword"]'
		});

		expect(name).toBeInTheDocument();
		expect(email).toBeInTheDocument();
		expect(password).toBeInTheDocument();
		expect(rePassword).toBeInTheDocument();

		const nameValue = 'test name';
		const emailValue = 'test@test.com';
		const passwordValue = '123123123';

		await fireEvent.input(name, { target: { value: nameValue } });
		await fireEvent.input(email, { target: { value: emailValue } });
		await fireEvent.input(password, { target: { value: passwordValue } });
		await fireEvent.input(rePassword, { target: { value: passwordValue } });

		expect(name).toHaveValue(nameValue);
		expect(email).toHaveValue(emailValue);
		expect(password).toHaveValue(passwordValue);
		expect(rePassword).toHaveValue(passwordValue);

		await fireEvent.click(registerButton);
	});
});
