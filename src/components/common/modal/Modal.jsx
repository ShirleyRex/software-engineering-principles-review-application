import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({ children, show = false, title, modalBg = 'transparent', closeModal, maxWidth = 400, zIndex = 50 }) => {
	const elRef = useRef(null);

	if (!elRef.current) {
		elRef.current = document.createElement('section');
		elRef.current.classList =
			'modal fixed top-0 left-0 flex items-center justify-center h-screen w-full p-4 transition-opacity opacity-0 invisible duration-300';
		elRef.current.style.cssText = `
			z-index: ${zIndex};
			background-color: rgba(29, 32, 37, 0.6);
		`;
		elRef.current.setAttribute('aria-modal', true);
		elRef.current.setAttribute('role', 'modal');
		elRef.current.setAttribute('id', 'modal');
	}

	useEffect(() => {
		const modalWrapper = document.getElementById('modalWrapper');
		modalWrapper.appendChild(elRef.current);

		return () => modalWrapper.removeChild(elRef.current);
	}, []);

	useEffect(() => {
		if (show) {
			let timeoutId = 0;

			timeoutId = setTimeout(() => {
				elRef.current.classList.add('show-modal');
			}, 100);

			return () => clearTimeout(timeoutId);
		}
	});

	return createPortal(
		<section className={`modal-content relative w-full rounded`} style={{ maxWidth, backgroundColor: modalBg }}>
			<div className="modal-header flex justify-between border-b px-4 py-2 text-right">
				{title && <h3 className="text-base-md font-semibold capitalize">{title}</h3>}
				<button
					className="text-dark bg-transparent text-base-md font-medium shadow-none"
					onClick={closeModal}
					aria-expanded="false"
					aria-controls="modal"
				>
					&#10006;
				</button>
			</div>
			{children}
		</section>,
		elRef.current
	);
};

Modal.propTypes = {
	children: PropTypes.element,
	closeModal: PropTypes.func,
	maxWidth: PropTypes.number,
	zIndex: PropTypes.number
};

export default React.memo(Modal);
