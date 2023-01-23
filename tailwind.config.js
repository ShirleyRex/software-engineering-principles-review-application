/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			screens: {
				sm: '600px',
				// => @media (min-width: 640px) { ... }
				md: '768px',
				// => @media (min-width: 768px) { ... }
				lg: '992px',
				// => @media (min-width: 1024px) { ... }
				xl: '1200px',
				// => @media (min-width: 1280px) { ... }
				'2xl': '1440px'
				// => @media (min-width: 1340px) { ... }
			},
			colors: {
				primary: 'rgb(var(--primary-color) / 1)',
				secondary: 'rgb(var(--secondary-color) / 1)',
				gray: {
					100: 'rgb(var(--light-gray) / 1)',
					200: 'rgb(var(--neutral-gray) / 1)',
					300: 'rgb(var(--neutral-dark-gray) / 1)'
				}
			},
			fontSize: {
				'base-sm': 'var(--h5)',
				base: 'var(--main-text)',
				'base-md': 'var(--intro-text)',
				lg: 'var(--h4)',
				xl: 'var(--h3)',
				'2xl': 'var(--h2)',
				'3xl': 'var(--h1)'
			},
			lineHeight: {
				'lh-small': 'var(--lf-line-height)',
				'lh-large': 'var(--sf-line-height)'
			}
		}
	},
	plugins: []
};
