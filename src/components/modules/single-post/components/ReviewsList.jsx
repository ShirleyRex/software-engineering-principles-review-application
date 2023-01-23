import React from 'react';
import PropTypes from 'prop-types';
import { dateFormat } from '../../../../utils/format';
import SingleReview from './SingleReview';

const ReviewsList = ({ list }) => {
	return (
		<div className="py-4">
			<h3 className="mb-4 border-b pb-4 text-base font-semibold">Reviews</h3>
			<section>
				{list.map((review, indx) => {
					const { name, rating, comments, timestamp, id, reviews_thread } = review;

					return (
						<SingleReview
							key={id}
							id={id}
							name={name}
							rating={rating}
							comments={comments}
							timestamp={timestamp}
							replies={reviews_thread}
						/>
					);
				})}
			</section>
		</div>
	);
};

ReviewsList.propTypes = {
	list: PropTypes.array
};

ReviewsList.defaultProps = {
	list: []
};

export default ReviewsList;
