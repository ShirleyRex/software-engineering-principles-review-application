import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { notify, NotifyContainer } from '../../../lib/notify';
import { authenticated } from '../../../../application/redux/user/selector';
import { register } from '../../../../application/firebase/services';
import { Input, Button } from '../../../ui';

const RegisterForm = () => {
	const [inputs, setInputs] = useState({ username: '', email: '', password: '', confirmPassword: '' });
	const [loading, setLoading] = useState(false);

	const isAuthenticated = useSelector((state) => authenticated(state));

	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated]);

	const handleChange = useCallback((e) => {
		setInputs((prevVal) => ({ ...prevVal, [e.target.name]: e.target.value }));
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		const emailRegex = /^([a-zA-Z0-9-_.]+)@([a-zA-Z-_.]+)\.([a-zA-Z]{2,5})/;

		if (!inputs.username || !inputs.email || !inputs.password) {
			setLoading(false);
			notify("Please fill all input", "error")
			return;
		}

		if (!emailRegex.test(inputs.email)) {
			setLoading(false);
			notify("Enter valid email address", "error")
			return;
		}

		if (inputs.password.length < 8) {
			setLoading(false);
			notify("Password must be atleast 8 in number", "error")
			return;
		}

		if (inputs.password !== inputs.confirmPassword) {
			setLoading(false);
			notify("Your password doesn't match", "error")
			return;
		}

		const result = await register(inputs.username, inputs.email, inputs.password);
		setLoading(false);

		if (result.success) {
			setInputs({ username: '', email: '', password: '', confirmPassword: '' });
			setTimeout(() => {
				navigate('/login');
			}, 2000);
		}

		notify(result.message, result.success ? 'success' : 'error');
	};

	return (
		<section className="register-form-wrapper flex h-screen w-full flex-col justify-center bg-gray-100 px-4 md:px-10 ">
			<hgroup className="mb-6">
				<h1 className="mb-2 text-center text-xl font-bold leading-lh-small text-primary">Sign up</h1>
				<p className="text-center text-base-md leading-lh-large text-secondary">To create an account.</p>
			</hgroup>
			<section className="w-full self-center md:w-4/5 xl:w-3/5">
				<form onSubmit={handleSubmit}>
					<Input
						label="username"
						id="username"
						onchange={handleChange}
						value={inputs.username}
						placeholder="Enter your user here"
					/>
					<Input
						label="email"
						id="email"
						onchange={handleChange}
						value={inputs.email}
						placeholder="Enter your email here"
					/>
					<Input
						type="password"
						label="password"
						value={inputs.password}
						id="password"
						onchange={handleChange}
						placeholder="Enter your password here"
					/>
					<Input
						type="password"
						label="confirm password"
						value={inputs.confirmPassword}
						id="confirmPassword"
						onchange={handleChange}
						placeholder="Enter here to confirm your password"
					/>
					<div className="flex items-center justify-center gap-x-2 py-4">
						<Button type="submit" text="register" loading={loading} background="#ff7d1a" />
					</div>
				</form>
				<p className="text-base font-bold leading-lh-large text-gray-300">
					<span>Already have an account?</span>{' '}
					<Link className="text-primary" to="/login">
						Login
					</Link>
				</p>
			</section>
			<NotifyContainer />
		</section>
	);
};

export default RegisterForm;
