import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = ({ type = 'button', text, background, loading, onclick }) => {
	return (
		<button
			type={type}
			style={{
				color: background === '#ff7d1a' ? '#ffffff' : '#333333',
				background: background ? background : '#ffffff'
			}}
			className="shadow-[0 2.5px 5px] rounded-[20px] border px-4 py-2 text-base font-semibold capitalize md:px-8"
			onClick={() => onclick()}
		>
			{!loading ? text : 'loading...'}
		</button>
	);
};

Button.propTypes = {
	type: PropTypes.string,
	text: PropTypes.string,
	onclick: PropTypes.func,
	background: PropTypes.string,
	loading: PropTypes.bool
};

Button.defaultProps = {
	onclick: () => null,
	background: '#ffffff'
};

export default React.memo(Button);
