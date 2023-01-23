import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AllReviews, Review } from '../components/modules';
import { allReviews } from '../application/redux/reviews/selectors';
import { Modal } from '../components/common';
import { deleteSingleReview, updateSingleReviewField } from '../application/redux/reviews/slice';
import { withAdminAuthLayout } from '../hoc/withAuthLayout';

const Reviews = () => {
	const [showModal, setShowModal] = useState(false);
	const [review, setReview] = useState({});

	const reviewsList = useSelector((state) => allReviews(state));

	const viewReview = (id) => {
		setShowModal(true);

		const newReview = reviewsList.find((reviewItem) => id === reviewItem.id);

		setReview(newReview);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<main className="main-content mt-10 min-h-[85vh]">
			<div className="container block px-2 pb-4">
				<fieldset className="min-h-[80vh] border px-2 md:px-4">
					<legend className="px-2 text-base-md font-semibold">Reviews</legend>
					<AllReviews list={reviewsList} view={viewReview} />
				</fieldset>
			</div>
			{showModal && (
				<Modal show={showModal} title="review" modalBg="white" maxWidth={600} closeModal={closeModal}>
					<Review {...review} closeModal={closeModal} deleteRev={deleteSingleReview} update={updateSingleReviewField} />
				</Modal>
			)}
		</main>
	);
};

export default withAdminAuthLayout(Reviews);
