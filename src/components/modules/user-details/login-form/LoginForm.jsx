import React, { useCallback, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../../application/redux/user/slice';
import { notify, NotifyContainer } from '../../../lib/notify';
import { Button, Input } from '../../../ui';
import { authenticated, getMessage, getLoadingState } from '../../../../application/redux/user/selector';

const LoginForm = () => {
	const [inputs, setInputs] = useState({ email: '', password: '' });
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const isAuthenticated = useSelector((state) => authenticated(state));
	const message = useSelector((state) => getMessage(state));

	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			let timerId = 0;

			timerId = setTimeout(() => {
				navigate('/');
			}, 1000);

			return () => clearTimeout(timerId);
		}
	}, [isAuthenticated]);

	const handleChange = useCallback(
		(e) => {
			setInputs({ ...inputs, [e.target.name]: e.target.value });
		},
		[inputs]
	);

	const skip = () => navigate('/');

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		if (!inputs.email || !inputs.password) {
			return;
		}

		dispatch(loginUser(inputs));
		console.log(message);
		setIsLoading(false);
		setInputs({ password: '', email: '' });
	};

	return (
		<section className="login-form-wrapper flex h-screen w-full flex-col justify-center bg-gray-100 px-4 md:px-10 ">
			<hgroup className="mb-6">
				<h1 className="mb-2 text-center text-xl font-bold leading-lh-small text-primary">Welcome back,</h1>
				<p className="text-center text-base-md leading-lh-large text-secondary">
					Please enter your details to continue
				</p>
			</hgroup>
			<section className="w-full self-center md:w-4/5 xl:w-3/5">
				<form onSubmit={handleSubmit}>
					<Input
						type="email"
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

					<div className="flex items-center justify-center gap-x-2 py-4">
						<Button text="skip" onclick={skip} />
						<Button type="submit" text="login" loading={isLoading} background="#ff7d1a" />
					</div>
				</form>
				<p className="text-base font-bold leading-lh-large text-gray-300">
					<span>Dont have an account?</span>{' '}
					<Link className="text-primary" to="/signup">
						Sign Up
					</Link>
				</p>
			</section>
			<NotifyContainer />
		</section>
	);
};

export default LoginForm;
