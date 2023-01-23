import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, label, placeholder, id, value, onchange }) => {
	return (
		<div className="py-4">
			<label className="mb-2 inline-block text-base font-bold capitalize leading-lh-large text-gray-300" htmlFor={id}>
				{label}
			</label>
			<input
				type={type}
				className="w-full rounded border py-2 px-4"
				placeholder={placeholder ? placeholder : ''}
				id={id}
				name={id}
				onChange={(e) => onchange(e)}
				value={value}
			/>
		</div>
	);
};

Input.propTypes = {
	type: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.string,
	onchange: PropTypes.func
};

Input.defaultProps = {
	type: 'text',
	onchange: () => null
};

export default React.memo(Input);
