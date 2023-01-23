import React from 'react';
import { LocationImage, LoginForm } from '../components/modules';
import { Input } from '../components/ui';

const Login = () => {
	return (
		<main>
			<section className="items-cente grid min-h-[100vh] grid-cols-1 md:grid-cols-2">
				<LoginForm />
				<LocationImage />
			</section>
		</main>
	);
};

export default Login;
