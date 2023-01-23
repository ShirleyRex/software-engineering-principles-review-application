export const allReviews = (state) => state.reviews.reviews;

export const getAverRatings = ({ reviews }) => {
	const ratings = reviews.reviews.reduce((total, curr) => {
		return total + curr.rating;
	}, 0);

	return Math.round(ratings / reviews.reviews.length || 0);
};
