import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '../../ui';
import { dateFormat } from '../../../utils/format';

const Review = ({ id, name, timestamp, comments, rating, validity, closeModal, deleteRev, update }) => {
	const dispatch = useDispatch();

	const approveReview = (id) => {
		dispatch(update(id));
		closeModal();
	};

	const rejectReview = (id) => {
		dispatch(deleteRev(id));
		closeModal(id);
	};

	return (
		<section className="px-4 py-6 md:px-8">
			<hgroup className="pb-4">
				<h2 className="mb-2 text-base-md font-bold leading-lh-small">{name}</h2>
				<p className="mb-2 text-base leading-lh-large">
					({dateFormat.localDate(timestamp, 'GBR', dateFormat.shortFormat)})
				</p>
			</hgroup>
			<div>
				<h3 className="mb-2 text-base font-bold leading-lh-small">Rating</h3>
				<div className="mb-4 flex items-center gap-x-2">
					{new Array(5).fill(false).map((_, index) => {
						return (
							<svg
								key={index + 1}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								width="24"
								height="24"
								viewBox="0 0 24 22"
							>
								<path
									fill={`${index + 1 <= rating ? '#ff7d1a' : '#ffffff'}`}
									stroke={`${index + 1 <= rating ? '#ff7d1a' : '#222633'}`}
									d="m12 1.62 2.22 6.83.11.34h7.54l-5.8 4.22-.3.22.11.34 2.22 6.83-5.8-4.22-.3-.21-.3.2-5.8 4.23 2.22-6.83.1-.34-.29-.22-5.8-4.22h7.54l.11-.34L12 1.62Z"
								/>
							</svg>
						);
					})}
				</div>
			</div>
			<div className="mb-10">
				<h3 className="mb-2 text-base font-bold leading-lh-small">Comment</h3>
				<p className="mb-2 text-base leading-lh-large">{comments}</p>
			</div>
			<div className="flex justify-end gap-x-2">
				{validity !== 'accepted' && (
					<>
						<Button text="Approve" onclick={() => approveReview(id)} />
						<Button text="reject" onclick={() => rejectReview(id)} />
					</>
				)}
				<Button text="cancel" onclick={closeModal} />
			</div>
		</section>
	);
};

Review.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	timestamp: PropTypes.string,
	comments: PropTypes.string,
	rating: PropTypes.number,
	validity: PropTypes.string,
	closeModal: PropTypes.func,
	update: PropTypes.func,
	deleteRev: PropTypes.func
};

export default Review;
