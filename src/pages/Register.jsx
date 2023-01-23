import React from 'react';
import { LocationImage, RegisterForm } from '../components/modules';

const Register = () => {
	return (
		<main>
			<section className="grid min-h-[100vh] grid-cols-1 items-center md:grid-cols-2">
				<RegisterForm />
				<LocationImage />
			</section>
		</main>
	);
};

export default Register;
