import React, { useState, useRef, useCallback, useId } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../ui';
import '../styles/review-form.css';
import { userInfo } from '../../../../application/redux/user/selector';

const ReviewForm = ({ locationId, addReview, close, locationName, update }) => {
	const [inputValue, setInputValue] = useState({ comment: '', ratings: new Array(5).fill(false) });
	const reviewFieldRef = useRef(null);

	const dispatch = useDispatch();
	const user = useSelector((state) => userInfo(state));

	const id = useId();

	const handleInputChange = useCallback((e) => {
		if (e.target.name === 'comment') {
			setInputValue((prevValues) => ({ ...prevValues, comment: e.target.value }));
		} else {
			setInputValue((prevValues) => {
				const newRatings = [];
				prevValues.ratings.forEach((rating, index) => {
					if (+e.target.value >= index) {
						newRatings.push(true);
					} else {
						newRatings.push(false);
					}
				});
				return { ...prevValues, ratings: newRatings };
			});
		}
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (inputValue.comment) {
			const data = {
				comments: inputValue.comment,
				rating: inputValue.ratings.filter((rating) => rating).length,
				location: {
					name: locationName,
					id: locationId
				},
				timestamp: new Date(Date.now()),
				validity: '',
				name: user.username || `Anonymous user ${id}`
			};

			dispatch(addReview({ collection: 'reviews', data }));

			update(data);

			close();
		}
	};

	return (
		<form className="p-4" onSubmit={handleSubmit}>
			<section className="reviews-field mb-4">
				<h3 className="mb-2 text-base font-semibold leading-lh-small">Reviews</h3>
				<div ref={reviewFieldRef} className="flex gap-x-2">
					{new Array(5).fill(1).map((_, indx) => {
						return (
							<label key={indx}>
								<input
									value={indx}
									onChange={handleInputChange}
									name="rating"
									className="star"
									checked={inputValue.ratings[indx]}
									type="checkbox"
								/>
							</label>
						);
					})}
				</div>
			</section>
			<div>
				<h3 className="mb-2 text-base font-semibold leading-lh-small">Comments</h3>
				<textarea
					className="w-full border"
					onChange={handleInputChange}
					value={inputValue.comment}
					name="comment"
					id=""
					rows="10"
				></textarea>
			</div>
			<div className="mt-4 flex justify-end gap-x-4">
				<Button type="submit" background="#ff7d1a" text="save" onclick={() => null} />
				<Button type="button" text="cancel" onclick={close} />
			</div>
		</form>
	);
};

ReviewForm.propTypes = {
	addReview: PropTypes.func,
	close: PropTypes.func,
	locationId: PropTypes.string,
	locationName: PropTypes.string,
	update: PropTypes.func
};

export default ReviewForm;
