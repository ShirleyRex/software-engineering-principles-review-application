import React from 'react';

const Footer = () => {
	return (
		<footer className="mt-6 bg-gray-100 p-4">
			<p className="text-center text-base-sm font-bold leading-lh-large text-gray-300">
				&copy; {new Date().getFullYear()} SEP Project. All rights reserved.
			</p>
		</footer>
	);
};

export default Footer;
